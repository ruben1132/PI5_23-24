using Mpt.Domain.Shared;
using Mpt.Domain.Plannings;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.IServices;
using Mpt.Domain.Tasks;
using Mpt.Core.Domain;
using Mpt.Core.Logic;
using Mpt.Domain.Users;

namespace Mpt.Services
{
    public class PlanningService : IPlanningService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPlanningRepository _repo;
        private readonly IPlanningRepository _tasksRepo;
        private readonly ITaskRepository _taskRepo;
        private readonly IUserRepository _userRepo;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public PlanningService(IConfiguration config, IUnitOfWork unitOfWork, IPlanningRepository repo, IPlanningRepository tasksRepo,
                ITaskRepository taskRepo, IUserRepository userRepo, HttpClient httpClient)
        {
            this._config = config;
            this._httpClient = httpClient;
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._tasksRepo = tasksRepo;
            this._userRepo = userRepo;
            this._taskRepo = taskRepo;
        }

        public async Task<Result<List<PlanningFullDto>>> GetAllAsync()
        {
            try
            {
                var plannings = await this._repo.GetAllAsync();

                if (plannings == null)
                    return Result<List<PlanningFullDto>>.Ok(new List<PlanningFullDto>());

                var planningsDto = new List<PlanningFullDto>();

                foreach (var planning in plannings)
                {
                    var taskDto = await this.GetTasksByIdAsync(planning);  // get task
                    var userDto = await this.GetUser(planning.UserId.Value); // get user
                    planningsDto.Add(PlanningMapper.ToDto(planning, taskDto.GetValue(), userDto));
                }

                return Result<List<PlanningFullDto>>.Ok(planningsDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<PlanningFullDto>>.Fail(ex.Message);
            }
        }



        public async Task<Result<PlanningFullDto>> GetByIdAsync(Guid id)
        {
            try
            {
                var planning = await this._repo.GetByIdAsync(new PlanningId(id));

                if (planning == null)
                    return Result<PlanningFullDto>.Fail("Planning not found.");

                var tasksDto = await this.GetTasksByIdAsync(planning);  // get tasks
                var userDto = await this.GetUser(planning.UserId.Value); // get user

                var planningDto = PlanningMapper.ToDto(planning, tasksDto.GetValue(), userDto);
                return Result<PlanningFullDto>.Ok(planningDto);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PlanningFullDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<PlanningFullDto>> AddAsync(CreatePlanningDto dto, Guid userId)
        {
            try
            {
                // convert ids to domain ids
                var taskIds = dto.Tasks.Select(t => new TaskId(t)).ToList();

                // get tasks
                var tasks = await this._taskRepo.GetByIdsAsync(taskIds);

                // TODO: call MP API
                // var tasksDto = await this.GetPlanningAsync(tasks);
                // if (tasksDto.IsFailure)
                //     return Result<PlanningFullDto>.Fail(tasksDto.Error);

                var planning = PlanningMapper.ToDomain(dto, userId.ToString(), 0);

                // Create PlanningTasks and add them to the Planning
                int sequence = 0;
                foreach (var t in tasks)
                {
                    // check if approved
                    if (t.IsApproved == ApprovalStatus.pending || t.IsApproved == ApprovalStatus.rejected)
                        return Result<PlanningFullDto>.Fail("Task " + t.Id.Value + " is not approved.");

                    var planningTask = new PlanningTask { Planning = planning, Task = t, SequenceOrder = sequence };
                    planning.PlanningTasks.Add(planningTask);

                    sequence++;
                }

                await this._repo.AddAsync(planning);
                await this._unitOfWork.CommitAsync();

                var tasksDto = await this.GetTasksByIdAsync(planning);  // get tasks
                var userDto = await this.GetUser(planning.UserId.Value); // get user

                var planningDto = PlanningMapper.ToDto(planning, tasksDto.GetValue(), userDto);
                return Result<PlanningFullDto>.Ok(planningDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PlanningFullDto>.Fail(ex.Message);
            }

        }

        public async Task<Result<PlanningSimpleDto>> DeleteAsync(Guid id)
        {
            try
            {
                var planning = await this._repo.GetByIdAsync(new PlanningId(id));

                if (planning == null)
                    return Result<PlanningSimpleDto>.Fail("Planning not found.");

                this._repo.Remove(planning);
                await this._unitOfWork.CommitAsync();

                var tasksDto = await this.GetTasksByIdAsync(planning);
                var planningDto = PlanningMapper.ToDto(planning);
                return Result<PlanningSimpleDto>.Ok(planningDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PlanningSimpleDto>.Fail(ex.Message);
            }
        }

        private async Task<Result<List<TaskSimpleDto>>> GetTasksByIdAsync(Planning planning)
        {
            try
            {
                var tasks = await this._repo.GetTasksForPlanningAsync(planning.Id);

                var tasksDto = new List<TaskSimpleDto>();

                if (tasks == null)
                    return Result<List<TaskSimpleDto>>.Ok(tasksDto);

                // to dto
                foreach (var task in tasks)
                {
                    tasksDto.Add(TaskMapper.ToDto(task));
                }

                return Result<List<TaskSimpleDto>>.Ok(tasksDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<TaskSimpleDto>>.Fail(ex.Message);
            }
        }

        private async Task<UserProfileDto> GetUser(string userId)
        {
            var user = await this._userRepo.GetByIdAsync(new UserId(userId)); // get user
            var userDto = UserMapper.ToProfileDto(user); // to dto

            if (userDto == null)
                return null;

            return userDto;
        }

        private async Task<Result<List<TaskSimpleDto>>> GetPlanningAsync(List<Domain.Tasks.Task> tasks)
        {
            try
            {
                // call MP API
                var route = this._config.GetValue<string>("MPApiUrl:planning") ?? "http://localhost:5000/findPath";
                this._httpClient.BaseAddress = new Uri(route);
                var response = await this._httpClient.GetAsync("");

                if (!response.IsSuccessStatusCode)
                    return Result<List<TaskSimpleDto>>.Fail("There was an error calculating the robot path. Please try again later.");

                var pathMovementDto = await response.Content.ReadFromJsonAsync<List<TaskSimpleDto>>();

                return Result<List<TaskSimpleDto>>.Ok(pathMovementDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<TaskSimpleDto>>.Fail(ex.Message);
            }
        }


    }
}