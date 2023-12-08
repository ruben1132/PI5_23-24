using Mpt.Domain.Tasks;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface ITaskService{

        Task<SurveillanceTaskDto> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto);
        Task<PickupDeliveryTaskDto> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto);

        Task<TaskDto> GetByIdAsync(TaskId id);

        Task<List<TaskDto>> GetAllAsync();
    }
}