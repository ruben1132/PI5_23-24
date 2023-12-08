using Mpt.Domain.Shared;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.Domain.Tasks;
using Mpt.IServices;

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

        public async Task<List<TaskDto>> GetAllAsync()
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

                return tasksDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<TaskDto> GetByIdAsync(TaskId id)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(id);

                if (task == null)
                    return null;

                if (task is SurveillanceTask)
                    return TaskMapper.ToDto(task as SurveillanceTask);
                else if (task is PickupDeliveryTask)
                    return TaskMapper.ToDto(task as PickupDeliveryTask);

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;

            }

        }

        // TODO: implement 2 separate methods update for each type of task 
        public async Task<TaskDto> UpdateAsync(TaskDto dto)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(new TaskId(dto.Id));

                if (task == null)
                    return null;

                if (task.IsApproved == true)
                    task.AproveTask();
                else
                    task.DisaproveTask();

                if (task.IsCompleted)
                    task.CompleteTask();


                await this._unitOfWork.CommitAsync();

                return TaskMapper.ToDto(task);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }


        public async Task<TaskDto> DeleteAsync(TaskId id)
        {
            try
            {
                var task = await this._repo.GetByIdAsync(id);

                if (task == null)
                    return null;

                ;
                this._repo.Remove(task);
                await this._unitOfWork.CommitAsync();

                return TaskMapper.ToDto(task);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<SurveillanceTaskDto> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto)
        {
            try
            {
                var surveillanceTask = TaskMapper.ToSurveillanceDomain(dto);

                await this._repo.AddAsync(surveillanceTask);
                await this._unitOfWork.CommitAsync();

                return TaskMapper.ToDto(surveillanceTask);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<PickupDeliveryTaskDto> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto)
        {
            try
            {
                var pickupDeliveryTask = TaskMapper.ToPickupDeliveryDomain(dto);

                await this._repo.AddAsync(pickupDeliveryTask);
                await this._unitOfWork.CommitAsync();

                return TaskMapper.ToDto(pickupDeliveryTask);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}