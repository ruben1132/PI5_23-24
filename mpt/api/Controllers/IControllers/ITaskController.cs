
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface ITasksController
    {
        Task<ActionResult<TaskDto>> CreateSurveillanceTaskAsync(CreateSurveillanceTaskDto task);
        Task<ActionResult<TaskDto>> CreatePickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto task);
        Task<ActionResult<TaskSimpleDto>>  ApproveReject(Guid id, IsApprovedDto isApproved);
        Task<ActionResult<List<TaskDto>>> GetAll([FromQuery] string type, [FromQuery] string? isApproved, [FromQuery] string? user);
        Task<ActionResult<List<TaskSimpleDto>>> GetMyTasks([FromQuery] string? type, [FromQuery] string? isApproved);
        Task<ActionResult<TaskDto>> GetById(Guid id);
        Task<ActionResult<string>> Delete(Guid id);
    }
}