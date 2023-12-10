using Microsoft.AspNetCore.Mvc;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase, IRolesController
    {
        private readonly IRoleService _service;

        public RolesController(IRoleService service)
        {
            this._service = service;
        }


        // POST: api/Role
        [HttpPost]
        public async Task<ActionResult<RoleDto>> Create(CreateRoleDto role)
        {
            try
            {
                var createdRole = await _service.AddAsync(role);

                if (createdRole.IsFailure)
                {
                    return BadRequest(createdRole.Error);
                }

                return Ok(createdRole.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }

        // PUT: api/Role/
        [HttpPut]
        public async Task<ActionResult<RoleDto>> Update(RoleDto role)
        {
            try
            {
                var updatedRole = await _service.UpdateAsync(role);

                if (updatedRole.IsFailure)
                {
                    return BadRequest(updatedRole.Error);
                }

                return Ok(updatedRole.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }

        // GET: api/Role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetAll(RoleDto role)
        {
            try
            {
                var roles = await _service.GetAllAsync();

                if (roles.IsFailure)
                {
                    return BadRequest(roles.Error);
                }

                return Ok(roles.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }

        // GET: api/Role/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDto>> GetById(Guid id)
        {
            try
            {
                var role = await _service.GetByIdAsync(id);

                if (role.IsFailure)
                {
                    return BadRequest(role.Error);
                }

                return Ok(role.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }

        // DELETE: api/Role/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(Guid id)
        {
            try
            {
                var deletedRole = await _service.DeleteAsync(id);

                if (deletedRole.IsFailure)
                {
                    return BadRequest(deletedRole.Error);
                }

                return Ok(deletedRole.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }
    }
}