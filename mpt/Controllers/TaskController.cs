using Microsoft.AspNetCore.Mvc;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using Microsoft.AspNetCore.Authorization;

namespace Mpt.Controllers
{
    [Authorize(Roles = "gestor tarefas")]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase, ITasksController
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            this._service = service;
        }


        // POST: api/Task/Surveillance
        [HttpPost("Surveillance")]
        public async Task<ActionResult<TaskDto>> CreateSurveillanceTaskAsync(CreateSurveillanceTaskDto task)
        {
            try
            {
                var createdTask = await _service.AddSurveillanceTaskAsync(task);

                if (createdTask.IsFailure)
                {
                    return BadRequest(new { error = createdTask.Error });
                }

                return Ok(createdTask.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST: api/Task/Pickupdelivery
        [HttpPost("Pickupdelivery")]
        public async Task<ActionResult<TaskDto>> CreatePickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto task)
        {
            try
            {
                var createdTask = await _service.AddPickupDeliveryTaskAsync(task);

                if (createdTask.IsFailure)
                {
                    return BadRequest(new { error = createdTask.Error });
                }

                return Ok(createdTask.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT: api/Task/
        [HttpPut]
        public async Task<ActionResult<TaskDto>> Update(TaskDto Task)
        {
            try
            {
                var updatedTask = await _service.UpdateAsync(Task);

                if (updatedTask.IsFailure)
                {
                    return BadRequest(new { error = updatedTask.Error });
                }

                return Ok(updatedTask.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll()
        {
            try
            {
                var Tasks = await _service.GetAllAsync();

                if (Tasks.IsFailure)
                {
                    return BadRequest(new { error = Tasks.Error });
                }

                return Ok(Tasks.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetById(Guid id)
        {
            try
            {
                var Task = await _service.GetByIdAsync(id);

                if (Task.IsFailure)
                {
                    return BadRequest(new { error = Task.Error });
                }

                return Ok(Task.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(Guid id)
        {
            try
            {
                var deletedTask = await _service.DeleteAsync(id);

                if (deletedTask.IsFailure)
                {
                    return BadRequest(new { error = deletedTask.Error });
                }

                return Ok(new { message = "Task deleted successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }


    }
}