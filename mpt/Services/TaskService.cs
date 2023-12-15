using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.Domain.Tasks;
using Mpt.IServices;
using Mpt.Core.Domain;
using Mpt.Core.Logic;
using System.Net.Http.Headers;

namespace Mpt.Services
{
    public class TaskService : ITaskService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITaskRepository _repo;
        private readonly IUserRepository _userRepo;
        private readonly HttpClient _httpClient;

        public TaskService(IConfiguration config, IUnitOfWork unitOfWork, ITaskRepository repo, IUserRepository userRepo, HttpClient httpClient)
        {
            this._config = config;
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._userRepo = userRepo;
            this._httpClient = httpClient;
        }

        public async Task<Result<List<TaskDto>>> GetAllAsync()
        {
            try
            {
                var tasks = await this._repo.GetAllAsync();

                var tasksDto = new List<TaskDto>();

                foreach (var task in tasks)
                {
                    // get user
                    var user = await this._userRepo.GetByIdAsync(task.UserId);

                    var userDto = UserMapper.ToDtoTaskInfo(user);

                    if (task is SurveillanceTask)
                        tasksDto.Add(TaskMapper.ToFullDto(task as SurveillanceTask, userDto));
                    else if (task is PickupDeliveryTask)
                        tasksDto.Add(TaskMapper.ToFullDto(task as PickupDeliveryTask, userDto));
                }

                return Result<List<TaskDto>>.Ok(tasksDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<TaskDto>>.Fail(ex.Message);
            }
        }

        public async Task<Result<TaskDto>> GetByIdAsync(Guid id)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(new TaskId(id));

                if (task == null)
                    return Result<TaskDto>.Fail("Task not found.");

                // get user
                var user = await this._userRepo.GetByIdAsync(task.UserId);
                var userDto = UserMapper.ToDtoTaskInfo(user);

                if (task is SurveillanceTask)
                {
                    var taskDto = TaskMapper.ToFullDto(task as SurveillanceTask, userDto);
                    return Result<TaskDto>.Ok(taskDto);
                }
                else if (task is PickupDeliveryTask)
                {
                    var taskDto = TaskMapper.ToFullDto(task as PickupDeliveryTask, userDto);
                    return Result<TaskDto>.Ok(taskDto);
                }

                return Result<TaskDto>.Fail("This task is weird...");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<TaskDto>.Fail(ex.Message);
            }

        }

        public async Task<Result<TaskSimpleDto>> UpdateAsync(TaskDto dto)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(new TaskId(dto.Id));

                if (task == null)
                    return Result<TaskSimpleDto>.Fail("Task not found.");

                if (task.IsApproved == true)
                    task.AproveTask();
                else
                    task.DisaproveTask();

                if (task.IsCompleted)
                    task.CompleteTask();


                await this._unitOfWork.CommitAsync();

                var taskDto = TaskMapper.ToDto(task);
                return Result<TaskSimpleDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<TaskSimpleDto>.Fail(ex.Message);
            }
        }


        public async Task<Result<string>> DeleteAsync(Guid id)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(new TaskId(id));

                if (task == null)
                    return Result<string>.Fail("Task not found.")

                ;
                this._repo.Remove(task);
                await this._unitOfWork.CommitAsync();

                return Result<string>.Ok("Deleted successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<string>.Fail(ex.Message);
            }
        }

        public async Task<Result<SurveillanceTaskSimpleDto>> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto, string userId, string token)
        {
            try
            {
                // get floor info
                var floorInfo = await this.GetFloorInfoAsync(dto.FloorId, token);
                if (floorInfo.IsFailure)
                    return Result<SurveillanceTaskSimpleDto>.Fail(floorInfo.Error);

                var surveillanceTask = TaskMapper.ToSurveillanceDomain(dto, userId, floorInfo.GetValue());

                await this._repo.AddAsync(surveillanceTask);
                await this._unitOfWork.CommitAsync();

                // get user
                var user = await this._userRepo.GetByIdAsync(surveillanceTask.UserId);
                var userDto = UserMapper.ToDtoTaskInfo(user);

                var taskDto = TaskMapper.ToDto(surveillanceTask, floorInfo.GetValue());
                return Result<SurveillanceTaskSimpleDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<SurveillanceTaskSimpleDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<PickupDeliveryTaskSimpleDto>> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto, string userId)
        {
            try
            {
                // get path and movements of the robot
                var pathMovementDto = await this.GetPathAsync(dto.Origin, dto.Destiny);

                if (pathMovementDto.IsFailure)
                    return Result<PickupDeliveryTaskSimpleDto>.Fail(pathMovementDto.Error);

                var pickupDeliveryTask = TaskMapper.ToPickupDeliveryDomain(dto, userId, pathMovementDto.GetValue());

                await this._repo.AddAsync(pickupDeliveryTask);
                await this._unitOfWork.CommitAsync();

                var taskDto = TaskMapper.ToDto(pickupDeliveryTask);
                return Result<PickupDeliveryTaskSimpleDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PickupDeliveryTaskSimpleDto>.Fail(ex.Message);

            }
        }

        private async Task<Result<PathMovementDto>> GetPathAsync(string origin, string destiny)
        {
            try
            {
                // call MP API
                var route = this._config.GetValue<string>("MPApiUrl") ?? "http://localhost:5000/";
                this._httpClient.BaseAddress = new Uri(route);
                var response = await this._httpClient.GetAsync($"findPath?algorithm=astar&origin={origin}&destiny={destiny}");

                if (!response.IsSuccessStatusCode)
                    return Result<PathMovementDto>.Fail("There was an error calculating the robot path. Please try again later.");

                var pathMovementDto = await response.Content.ReadFromJsonAsync<PathMovementDto>();

                return Result<PathMovementDto>.Ok(pathMovementDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PathMovementDto>.Fail(ex.Message);
            }
        }

        private async Task<Result<string>> GetFloorInfoAsync(string floorId, string token)
        {
            try
            {
                // Create HttpClientHandler with withCredentials set to true
                var handler = new HttpClientHandler
                {
                    UseCookies = true,
                    UseDefaultCredentials = true,
                    AllowAutoRedirect = true,
                };

                // new http client cuz i need to set the handler
                using var httpClient = new HttpClient(handler);
                // call MGI API
                var route = this._config.GetValue<string>("MGIApiUrl:floor") ?? "http://localhost:2225/api/floors/";
                httpClient.BaseAddress = new Uri(route);

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                // httpClient.DefaultRequestHeaders.Add("withCredentials", "true");

                var response = await httpClient.GetAsync($"{floorId}");

                if (!response.IsSuccessStatusCode)
                    return Result<string>.Fail(response.ReasonPhrase);

                var floor = await response.Content.ReadFromJsonAsync<FloorInfoDto>();

                return Result<string>.Ok(floor.Code);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<string>.Fail(ex.Message);
            }
        }
    }
}