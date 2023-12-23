
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface IUsersController
    {
        Task<ActionResult<UserWithRoleDto>> Create(CreateUserDto user);
        Task<ActionResult<UserWithRoleDto>> Update(UserDto user);
        Task<ActionResult<UserProfileDto>> UpdateMyProfile(UpdateUserProfile user);
        Task<ActionResult<UserWithRoleDto>> ApproveReject(Guid id, IsApprovedDto user);
        Task<ActionResult<IEnumerable<UserWithRoleDto>>> GetAll([FromQuery] bool? isSysUser, [FromQuery] string? isApproved);
        Task<ActionResult<UserWithRoleDto>> GetById(Guid id);
        Task<ActionResult<UserWithRoleDto>> GetMyProfile();
        Task<ActionResult<string>> Delete(Guid id);
        Task<ActionResult<string>> DeleteMyProfile();
    }
}