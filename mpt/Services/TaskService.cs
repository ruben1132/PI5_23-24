using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.Domain.Tasks;
using Mpt.IServices;
using Mpt.Core.Domain;
using Mpt.Core.Logic;

namespace Mpt.Services
{
    public class TaskService : ITaskService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITaskRepository _repo;
        private readonly IUserRepository _userRepo;
        private readonly HttpClient _httpClient;
        private readonly string _mpApiUrl;
        private readonly string _mgiApiUrl;

        public TaskService(IConfiguration config, IUnitOfWork unitOfWork, ITaskRepository repo, IUserRepository userRepo, HttpClient httpClient)
        {
            this._config = config;

            this._mpApiUrl = config.GetValue<string>("MPApiUrl") ?? "http://localhost:5000/";
            this._mgiApiUrl = config.GetValue<string>("MGIApiUrl") ?? "http://localhost:2225/";

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
                        tasksDto.Add(TaskMapper.ToDto(task as SurveillanceTask, userDto));
                    else if (task is PickupDeliveryTask)
                        tasksDto.Add(TaskMapper.ToDto(task as PickupDeliveryTask, userDto));
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
                    var taskDto = TaskMapper.ToDto(task as SurveillanceTask, userDto);
                    return Result<TaskDto>.Ok(taskDto);
                }
                else if (task is PickupDeliveryTask)
                {
                    var taskDto = TaskMapper.ToDto(task as PickupDeliveryTask, userDto);
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

        public async Task<Result<TaskDto>> UpdateAsync(TaskDto dto)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(new TaskId(dto.Id));

                if (task == null)
                    return Result<TaskDto>.Fail("Task not found.");

                if (task.IsApproved == true)
                    task.AproveTask();
                else
                    task.DisaproveTask();

                if (task.IsCompleted)
                    task.CompleteTask();


                await this._unitOfWork.CommitAsync();

                // get user
                var user = await this._userRepo.GetByIdAsync(task.UserId);
                var userDto = UserMapper.ToDtoTaskInfo(user);

                var taskDto = TaskMapper.ToDto(task, userDto);
                return Result<TaskDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<TaskDto>.Fail(ex.Message);
            }
        }


        public async Task<Result<TaskDto>> DeleteAsync(Guid id)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(new TaskId(id));

                if (task == null)
                    return Result<TaskDto>.Fail("Task not found.")

                ;
                this._repo.Remove(task);
                await this._unitOfWork.CommitAsync();

                // get user
                var user = await this._userRepo.GetByIdAsync(task.UserId);
                var userDto = UserMapper.ToDtoTaskInfo(user);

                var taskDto = TaskMapper.ToDto(task, userDto);
                return Result<TaskDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<TaskDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<SurveillanceTaskDto>> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto, string userId)
        {
            try
            {
                // get floor info

                if (pathMovementDto.IsFailure)
                    return Result<SurveillanceTaskDto>.Fail(pathMovementDto.Error);

                var surveillanceTask = TaskMapper.ToSurveillanceDomain(dto, userId, pathMovementDto.GetValue());

                await this._repo.AddAsync(surveillanceTask);
                await this._unitOfWork.CommitAsync();

                // get user
                var user = await this._userRepo.GetByIdAsync(surveillanceTask.UserId);
                var userDto = UserMapper.ToDtoTaskInfo(user);

                var taskDto = TaskMapper.ToDto(surveillanceTask, userDto);
                return Result<SurveillanceTaskDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<SurveillanceTaskDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<PickupDeliveryTaskDto>> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto, string userId)
        {
            try
            {
                // get path and movements of the robot
                var pathMovementDto = await this.GetPathAsync(dto.Origin, dto.Destiny);

                if (pathMovementDto.IsFailure)
                    return Result<PickupDeliveryTaskDto>.Fail(pathMovementDto.Error);

                var pickupDeliveryTask = TaskMapper.ToPickupDeliveryDomain(dto, userId, pathMovementDto.GetValue());

                await this._repo.AddAsync(pickupDeliveryTask);
                await this._unitOfWork.CommitAsync();

                // get user
                var user = await this._userRepo.GetByIdAsync(pickupDeliveryTask.UserId);
                var userDto = UserMapper.ToDtoTaskInfo(user);

                var taskDto = TaskMapper.ToDto(pickupDeliveryTask, userDto);
                return Result<PickupDeliveryTaskDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PickupDeliveryTaskDto>.Fail(ex.Message);

            }
        }

        private async Task<Result<PathMovementDto>> GetPathAsync(string origin, string destiny)
        {
            try
            {
                // call MP API
                this._httpClient.BaseAddress = new Uri(this._mpApiUrl);
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

        private async Task<Result<string>> GetFloorInfoAsync(string floorId)
        {
            try
            {
                // call MGI API
                this._httpClient.BaseAddress = new Uri(this._mgiApiUrl);
                var response = await this._httpClient.GetAsync($"floors/{floorId}");

                if (!response.IsSuccessStatusCode)
                    return Result<string>.Fail("There was an error calculating the robot path. Please try again later.");

                var pathMovementDto = await response.Content.ReadFromJsonAsync<PathMovementDto>();

                return Result<string>.Ok(pathMovementDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<string>.Fail(ex.Message);
            }
        }
    }
}