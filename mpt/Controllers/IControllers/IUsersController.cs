
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface IUsersController
    {
        Task<ActionResult<UserWithRoleDto>> Create(CreateUserDto role);
        Task<ActionResult<UserWithRoleDto>> Update(UserDto role);
        Task<ActionResult<UserWithRoleDto>> ApproveReject(Guid id, UserIsApprovedDto user);
        Task<ActionResult<IEnumerable<UserWithRoleDto>>> GetAll([FromQuery] bool? isSysUser, [FromQuery] string? isApproved);
        Task<ActionResult<UserWithRoleDto>> GetById(Guid id);
        Task<ActionResult<string>> Delete(Guid id);
    }
}