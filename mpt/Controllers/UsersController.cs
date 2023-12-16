using Microsoft.AspNetCore.Mvc;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using Microsoft.AspNetCore.Authorization;
using mpt.Dtos.User;

namespace Mpt.Controllers
{

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
        [Authorize(Roles = "admin, gestor tarefas")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWithRoleDto>>> GetAll([FromQuery] bool? isSysUser, [FromQuery] string? isApproved)
        {
            try
            {
                var users = await _service.GetAllAsync(isSysUser, isApproved);

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
        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserWithRoleDto>> GetById(Guid id)
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


        // GET: api/User/profile
        [AllowAnonymous]
        [HttpGet("profile")]
        public async Task<ActionResult<UserProfileDto>> GetMyProfile()
        {
            try
            {
                // get current user
                var currentUser = HttpContext.Items["user"] as UserWithRoleDto;

                Console.WriteLine(currentUser);

                if (currentUser == null)
                {
                    return BadRequest(new { error = "Not authenticated" });
                }

                var user = await _service.GetByIdAsync(new Guid(currentUser.Id));

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


        // GET: api/User/allInfo
        [Authorize(Roles = "utente")]
        [HttpGet("allInfo")]
        public async Task<ActionResult<UserWithTasks>> GetUserAllInfo()
        {
            try
            {
                // get current user
                var currentUser = HttpContext.Items["user"] as UserWithRoleDto;

                if (currentUser == null)
                {
                    return BadRequest(new { error = "Not authenticated" });
                }

                var user = await _service.GetByIdAsync(new Guid(currentUser.Id));

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
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<UserWithRoleDto>> Create(CreateUserDto user)
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

        // PATCH: api/User/
        [Authorize(Roles = "admin")]
        [HttpPatch]
        public async Task<ActionResult<UserWithRoleDto>> Update(UserDto user)
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

        // PATCH: api/User/
        [Authorize(Roles = "admin, utente, gestor tarefas, gestor frota, gestor campus")]
        [HttpPatch("profile")]
        public async Task<ActionResult<UserProfileDto>> UpdateMyProfile(UpdateUserProfile user)
        {
            try
            {
                // get current user
                var currentUser = HttpContext.Items["user"] as UserWithRoleDto;

                var updatedUser = await _service.UpdateMyProfileAsync(user, currentUser.Id);

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

        // PATCH: api/User/5
        [Authorize(Roles = "admin")]
        [HttpPatch("{id}")]
        public async Task<ActionResult<UserWithRoleDto>> ApproveReject(Guid id, UserIsApprovedDto user)
        {
            try
            {
                var updatedUser = await _service.UpdateIsApprovedAsync(id, user);

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
        [Authorize(Roles = "admin")]
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