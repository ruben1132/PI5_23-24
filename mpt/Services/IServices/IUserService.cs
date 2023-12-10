
using Mpt.Core.Logic;
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IUserService{

        Task<Result<UserWithRoleDto>> AddAsync(CreateUserDto dto);

        Task<Result<UserWithRoleDto>> GetByIdAsync(UserId id);

        Task<Result<List<UserWithRoleDto>>> GetAllAsync();

        Task<Result<UserWithRoleDto>> UpdateAsync(UserDto dto);
        Task<Result<UserDto>> DeleteAsync(UserId id);
    }
}