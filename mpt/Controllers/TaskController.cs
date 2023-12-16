using Microsoft.AspNetCore.Mvc;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using Microsoft.AspNetCore.Authorization;

namespace Mpt.Controllers
{
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
        [Authorize(Roles = "utente,gestor tarefas")]
        [HttpPost("Surveillance")]
        public async Task<ActionResult<TaskDto>> CreateSurveillanceTaskAsync(CreateSurveillanceTaskDto task)
        {
            try
            {
                // get current user
                var currentUser = HttpContext.Items["user"] as UserWithRoleDto;
                // get token
                var token = GetToken();

                var createdTask = await _service.AddSurveillanceTaskAsync(task, currentUser.Id, token);

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
        [Authorize(Roles = "utente,gestor tarefas")]
        [HttpPost("Pickupdelivery")]
        public async Task<ActionResult<TaskDto>> CreatePickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto task)
        {
            try
            {
                // get current user
                var currentUser = HttpContext.Items["user"] as UserWithRoleDto;
                var token = GetToken();

                var createdTask = await _service.AddPickupDeliveryTaskAsync(task, currentUser.Id);

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
        [Authorize(Roles = "gestor tarefas")]
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
        [Authorize(Roles = "gestor tarefas")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll([FromQuery] string? type, [FromQuery] string? isApproved, [FromQuery] string? user)
        {
            try
            {
                // get token
                var token = GetToken();

                var Tasks = await _service.GetAllAsync(token, type, user, isApproved);

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
        // GET: api/Task/my
        [Authorize(Roles = "gestor tarefas, utente")]
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<TaskSimpleDto>>> GetMyTasks([FromQuery] string type, [FromQuery] string? isApproved)
        {
            try
            {
                // get current user
                var currentUser = HttpContext.Items["user"] as UserWithRoleDto;
                // get token
                var token = GetToken();

                var Tasks = await _service.GetMyTasksAsync(token, type, currentUser.Id, isApproved);

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
        [Authorize(Roles = "gestor tarefas")]
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
        [Authorize(Roles = "gestor tarefas")]
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

        private string GetToken()
        {
            string authorizationHeader = HttpContext.Request.Headers["Authorization"];
            string token = authorizationHeader.Substring("Bearer ".Length);

            return token;
        }

    }
}