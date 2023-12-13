
using Mpt.Core.Logic;
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IUserService
    {

        Task<Result<UserWithRoleDto>> AddAsync(CreateUserDto dto);

        Task<Result<UserWithRoleDto>> GetByIdAsync(Guid id);

        Task<Result<List<UserWithRoleDto>>> GetAllAsync(bool? isSysUser, bool? isApproved, bool? all);

        Task<Result<UserWithRoleDto>> UpdateAsync(UserDto dto);
        Task<Result<UserDto>> DeleteAsync(Guid id);
    }
}