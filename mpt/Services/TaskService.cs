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
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITaskRepository _repo;

        public TaskService(IUnitOfWork unitOfWork, ITaskRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<Result<List<TaskDto>>> GetAllAsync()
        {
            try
            {
                var tasks = await this._repo.GetAllAsync();

                var tasksDto = new List<TaskDto>();

                foreach (var task in tasks)
                {
                    if (task is SurveillanceTask)
                        tasksDto.Add(TaskMapper.ToDto(task as SurveillanceTask));
                    else if (task is PickupDeliveryTask)
                        tasksDto.Add(TaskMapper.ToDto(task as PickupDeliveryTask));
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

                if (task is SurveillanceTask)
                {
                    var taskDto = TaskMapper.ToDto(task as SurveillanceTask);
                    return Result<TaskDto>.Ok(taskDto);
                }
                else if (task is PickupDeliveryTask)
                {
                    var taskDto = TaskMapper.ToDto(task as PickupDeliveryTask);
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

                var taskDto = TaskMapper.ToDto(task);
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

                var taskDto = TaskMapper.ToDto(task);
                return Result<TaskDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<TaskDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<SurveillanceTaskDto>> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto)
        {
            try
            {
                var surveillanceTask = TaskMapper.ToSurveillanceDomain(dto);

                await this._repo.AddAsync(surveillanceTask);
                await this._unitOfWork.CommitAsync();

                var taskDto = TaskMapper.ToDto(surveillanceTask);
                return Result<SurveillanceTaskDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<SurveillanceTaskDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<PickupDeliveryTaskDto>> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto)
        {
            try
            {
                var pickupDeliveryTask = TaskMapper.ToPickupDeliveryDomain(dto);

                await this._repo.AddAsync(pickupDeliveryTask);
                await this._unitOfWork.CommitAsync();

                var taskDto = TaskMapper.ToDto(pickupDeliveryTask);
                return Result<PickupDeliveryTaskDto>.Ok(taskDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<PickupDeliveryTaskDto>.Fail(ex.Message);

            }
        }
    }
}