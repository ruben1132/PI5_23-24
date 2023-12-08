using Mpt.Domain.Roles;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IRoleService{

        Task<RoleDto> AddAsync(CreateRoleDto dto);

        Task<RoleDto> GetByIdAsync(RoleId id);

        Task<List<RoleDto>> GetAllAsync();
    }
}