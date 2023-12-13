using Microsoft.AspNetCore.Mvc;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using Microsoft.AspNetCore.Authorization;

namespace Mpt.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase, IUsersController
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            this._service = service;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll([FromQuery] bool? isSysUser, [FromQuery] bool? isApproved, [FromQuery] bool? all)
        {
            try
            {
                var users = await _service.GetAllAsync(isSysUser, isApproved, all);

                if (users.IsFailure)
                {
                    return BadRequest(new { error = users.Error });
                }

                return Ok(users.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/User/5

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(Guid id)
        {
            try
            {
                var user = await _service.GetByIdAsync(id);

                if (user.IsFailure)
                {
                    return BadRequest(new { error = user.Error });
                }

                return Ok(user.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST: api/User        
        [HttpPost]
        public async Task<ActionResult<UserDto>> Create(CreateUserDto user)
        {
            try
            {
                var createdUser = await _service.AddAsync(user);

                if (createdUser.IsFailure)
                {
                    return BadRequest(new { error = createdUser.Error });
                }

                return Ok(createdUser.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT: api/User/
        [HttpPatch]
        public async Task<ActionResult<UserDto>> Update(UserDto user)
        {
            try
            {
                var updatedUser = await _service.UpdateAsync(user);

                if (updatedUser.IsFailure)
                {
                    return BadRequest(new { error = updatedUser.Error });
                }

                return Ok(updatedUser.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }


        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete(Guid id)
        {
            try
            {
                var deletedUser = await _service.DeleteAsync(id);

                if (deletedUser.IsFailure)
                {
                    return BadRequest(new { error = deletedUser.Error });
                }

                return Ok(new { message = "User deleted successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}