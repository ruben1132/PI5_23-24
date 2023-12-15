using Mpt.Core.Logic;
using Mpt.Domain.Tasks;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface ITaskService{

        Task<Result<SurveillanceTaskSimpleDto>> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto, string userId, string token);
        Task<Result<PickupDeliveryTaskSimpleDto>> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto, string userId);
        Task<Result<TaskDto>> GetByIdAsync(Guid id);
        Task<Result<List<TaskDto>>> GetAllAsync();
        Task<Result<TaskSimpleDto>> UpdateAsync(TaskDto dto);
        Task<Result<string>> DeleteAsync(Guid id);
        
    }
}