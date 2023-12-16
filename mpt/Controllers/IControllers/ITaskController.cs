
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface ITasksController
    {
        Task<ActionResult<TaskDto>> CreateSurveillanceTaskAsync(CreateSurveillanceTaskDto task);
        Task<ActionResult<TaskDto>> CreatePickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto task);
        Task<ActionResult<TaskDto>> Update(TaskDto Task);
        Task<ActionResult<IEnumerable<TaskDto>>> GetAll([FromQuery] string type, [FromQuery] string? isApproved, [FromQuery] string? user);
        Task<ActionResult<IEnumerable<TaskSimpleDto>>> GetMyTasks([FromQuery] string? type, [FromQuery] string? isApproved);
        Task<ActionResult<TaskDto>> GetById(Guid id);
        Task<ActionResult<string>> Delete(Guid id);
    }
}