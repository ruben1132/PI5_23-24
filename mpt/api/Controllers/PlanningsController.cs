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
    public class PlanningsController : ControllerBase, IPlanningsController
    {
        private readonly IPlanningService _service;

        public PlanningsController(IPlanningService service)
        {
            this._service = service;
        }

        // POST: api/Planning
        [HttpPost]
        public async Task<ActionResult<PlanningFullDto>> Create(CreatePlanningDto tasks)
        {
            try
            {
                 // get current user
                var currentUser = HttpContext.Items["user"] as UserWithRoleDto;

                var createdPlanning = await _service.AddAsync(tasks, new Guid(currentUser.Id));

                if (createdPlanning.IsFailure)
                {
                    return BadRequest(new { error = createdPlanning.Error });
                }

                return Ok(createdPlanning.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/Planning
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanningFullDto>>> GetAll()
        {
            try
            {
                var plannings = await _service.GetAllAsync();

                if (plannings.IsFailure)
                {
                    return BadRequest(new { error = plannings.Error });
                }

                return Ok(plannings.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/Planning/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlanningFullDto>> GetById(Guid id)
        {
            try
            {
                var planning = await _service.GetByIdAsync(id);

                if (planning.IsFailure)
                {
                    return BadRequest(new { error = planning.Error });
                }

                return Ok(planning.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // DELETE: api/Planning/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(Guid id)
        {
            try
            {
                var deletedPlanning = await _service.DeleteAsync(id);

                if (deletedPlanning.IsFailure)
                {
                    return BadRequest(new { error = deletedPlanning.Error });
                }

                return Ok(new { message = "Planning deleted successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}