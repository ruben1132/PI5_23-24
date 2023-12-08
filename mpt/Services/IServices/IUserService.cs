
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IUserService{

        Task<UserWithRoleDto> AddAsync(CreateUserDto dto);

        Task<UserWithRoleDto> GetByIdAsync(UserId id);

        Task<List<UserWithRoleDto>> GetAllAsync();

        Task<UserWithRoleDto> UpdateAsync(UserDto dto);
        Task<UserDto> DeleteAsync(UserId id);
    }
}