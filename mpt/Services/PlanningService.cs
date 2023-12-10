using Mpt.Domain.Shared;
using Mpt.Domain.Plannings;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.IServices;
using Mpt.Domain.Tasks;
using Mpt.Core.Domain;

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

        public async Task<List<PlanningWithTasksDto>> GetAllAsync()
        {
            try
            {
                var plannings = await this._repo.GetAllAsync();

                if (plannings == null)
                    return null;

                var planningsDto = new List<PlanningWithTasksDto>();

                foreach (var planning in plannings)
                {
                    var tasksDto = await this.GetTasksByIdsAsync(planning);
                    planningsDto.Add(PlanningMapper.ToDto(planning, tasksDto));
                }

                return planningsDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<PlanningWithTasksDto> GetByIdAsync(PlanningId id)
        {
            try
            {
                var planning = await this._repo.GetByIdAsync(id);

                if (planning == null)
                    return null;


                var tasksDto = await this.GetTasksByIdsAsync(planning);

                return PlanningMapper.ToDto(planning, tasksDto);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<PlanningWithTasksDto> AddAsync(CreatePlanningDto dto)
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

                return PlanningMapper.ToDto(planning, tasksDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }

        }

        public async Task<PlanningWithTasksDto> DeleteAsync(PlanningId id)
        {
            try
            {
                var planning = await this._repo.GetByIdAsync(id);

                if (planning == null)
                    return null;

                this._repo.Remove(planning);
                await this._unitOfWork.CommitAsync();

                return PlanningMapper.ToDto(planning, new List<TaskDto>());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        private async Task<List<TaskDto>> GetTasksByIdsAsync(Planning planning)
        {
            try
            {
                var tasks = await this._repo.GetTasksForPlanningAsync(planning.Id);

                var tasksDto = new List<TaskDto>();

                if (tasks == null)
                    return tasksDto;

                // to dto
                foreach (var task in tasks)
                {
                    tasksDto.Add(TaskMapper.ToDto(task));
                }

                return tasksDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}