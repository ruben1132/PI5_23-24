using Mpt.Domain.Shared;
using Mpt.Domain.Plannings;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.IServices;
using Mpt.Domain.Tasks;
using Mpt.Core.Domain;
using Mpt.Core.Logic;

namespace Mpt.Services
{
    public class PlanningService : IPlanningService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPlanningRepository _repo;
        private readonly ITaskRepository _taskRepo;


        public PlanningService(IUnitOfWork unitOfWork, IPlanningRepository repo, ITaskRepository taskRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._taskRepo = taskRepo;
        }

        public async Task<Result<List<PlanningWithTasksDto>>> GetAllAsync()
        {
            try
            {
                var plannings = await this._repo.GetAllAsync();

                if (plannings == null)
                    return Result<List<PlanningWithTasksDto>>.Ok(new List<PlanningWithTasksDto>());

                var planningsDto = new List<PlanningWithTasksDto>();

                foreach (var planning in plannings)
                {
                    var tasksDto = await this.GetTasksByIdsAsync(planning);
                    planningsDto.Add(PlanningMapper.ToDto(planning, tasksDto.GetValue()));
                }

                return Result<List<PlanningWithTasksDto>>.Ok(planningsDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<PlanningWithTasksDto>>.Fail(ex.Message);
            }
        }

        public async Task<Result<PlanningWithTasksDto>> GetByIdAsync(PlanningId id)
        {
            try
            {
                var planning = await this._repo.GetByIdAsync(id);

                if (planning == null)
                    return Result<PlanningWithTasksDto>.Fail("Planning not found.");

                var tasksDto = await this.GetTasksByIdsAsync(planning);
                var planningDto = PlanningMapper.ToDto(planning, tasksDto.GetValue());
                return Result<PlanningWithTasksDto>.Ok(planningDto);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PlanningWithTasksDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<PlanningWithTasksDto>> AddAsync(CreatePlanningDto dto)
        {
            try
            {
                var planning = PlanningMapper.ToDomain(dto);

                // Create PlanningTasks and add them to the Planning
                int sequence = 0;
                foreach (var taskId in dto.Tasks)
                {
                    var task = await this._taskRepo.GetByIdAsync(taskId);
                    var planningTask = new PlanningTask { Planning = planning, Task = task, SequenceOrder = 0 };
                    planning.PlanningTasks.Add(planningTask);

                    sequence++;
                }

                await this._repo.AddAsync(planning);
                await this._unitOfWork.CommitAsync();

                var tasksDto = await this.GetTasksByIdsAsync(planning);
                var planningDto = PlanningMapper.ToDto(planning, tasksDto.GetValue());
                return Result<PlanningWithTasksDto>.Ok(planningDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PlanningWithTasksDto>.Fail(ex.Message);
            }

        }

        public async Task<Result<PlanningWithTasksDto>> DeleteAsync(PlanningId id)
        {
            try
            {
                var planning = await this._repo.GetByIdAsync(id);

                if (planning == null)
                    return Result<PlanningWithTasksDto>.Fail("Planning not found.");

                this._repo.Remove(planning);
                await this._unitOfWork.CommitAsync();

                var tasksDto = await this.GetTasksByIdsAsync(planning);
                var planningDto = PlanningMapper.ToDto(planning, tasksDto.GetValue());
                return Result<PlanningWithTasksDto>.Ok(planningDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PlanningWithTasksDto>.Fail(ex.Message);
            }
        }

        private async Task<Result<List<TaskSimpleDto>>> GetTasksByIdsAsync(Planning planning)
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
    }
}