
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface IUsersController
    {
        Task<ActionResult<UserDto>> Create(CreateUserDto role);
        Task<ActionResult<UserDto>> Update(UserDto role);
        Task<ActionResult<IEnumerable<UserDto>>> GetAll([FromQuery] bool? isSysUser, [FromQuery] bool? isApproved, bool? all);
        Task<ActionResult<UserDto>> GetById(Guid id);
        Task<ActionResult<string>> Delete(Guid id);
    }
}