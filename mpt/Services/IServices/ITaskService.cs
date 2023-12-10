using Mpt.Core.Logic;
using Mpt.Domain.Tasks;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface ITaskService{

        Task<Result<SurveillanceTaskDto>> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto);
        Task<Result<PickupDeliveryTaskDto>> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto);
        Task<Result<TaskDto>> GetByIdAsync(TaskId id);
        Task<Result<List<TaskDto>>> GetAllAsync();
        Task<Result<TaskDto>> UpdateAsync(TaskDto dto);
    }
}