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
    public class UsersController : ControllerBase, IUsersController
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            this._service = service;
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
                    return BadRequest(createdUser.Error);
                }

                return Ok(createdUser.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }

        // PUT: api/User/
        [HttpPut]
        public async Task<ActionResult<UserDto>> Update(UserDto user)
        {
            try
            {
                var updatedUser = await _service.UpdateAsync(user);

                if (updatedUser.IsFailure)
                {
                    return BadRequest(updatedUser.Error);
                }

                return Ok(updatedUser.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll(UserDto user)
        {
            try
            {
                var users = await _service.GetAllAsync();

                if (users.IsFailure)
                {
                    return BadRequest(users.Error);
                }

                return Ok(users.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
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
                    return BadRequest(user.Error);
                }

                return Ok(user.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
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
                    return BadRequest(deletedUser.Error);
                }

                return Ok(deletedUser.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
            }
        }
    }
}