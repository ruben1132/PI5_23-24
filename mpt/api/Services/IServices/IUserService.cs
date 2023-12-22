
using Mpt.Core.Logic;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IUserService
    {

        Task<Result<UserWithRoleDto>> AddAsync(CreateUserDto dto);

        Task<Result<UserWithRoleDto>> GetByIdAsync(Guid id);
        Task<Result<UserProfileDto>> GetMyProfileAsync(Guid id);
        Task<Result<List<UserWithRoleDto>>> GetAllAsync(bool? isSysUser, string? isApproved);
        Task<Result<UserWithTasks>> GetUserAllInfo(Guid id, string token);
        Task<Result<UserWithRoleDto>> UpdateAsync(UserDto dto);
        Task<Result<UserProfileDto>> UpdateMyProfileAsync(UpdateUserProfile dto, string userId);
        Task<Result<UserDto>> UpdateIsApprovedAsync(Guid id, IsApprovedDto dto);

        Task<Result<UserDto>> DeleteAsync(Guid id);
        Task<Result<UserDto>> DeleteIgnoringActiveAsync(Guid id);
    }
}