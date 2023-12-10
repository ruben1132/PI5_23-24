using Mpt.Core.Logic;
using Mpt.Domain.Roles;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IRoleService{

        Task<Result<RoleDto>> AddAsync(CreateRoleDto dto);
        Task<Result<RoleDto>> UpdateAsync(RoleDto dto);
        Task<Result<RoleDto>> GetByIdAsync(Guid id);
        Task<Result<List<RoleDto>>> GetAllAsync();
        Task<Result<RoleDto>> DeleteAsync(Guid id);
    }
}