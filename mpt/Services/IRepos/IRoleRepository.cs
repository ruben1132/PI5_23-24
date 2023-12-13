using Mpt.Core.Domain;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Mpt.IRepositories
{
    public interface IRoleRepository: IRepository<Role,RoleId>
    {
        Task<Role> GetByNameAsync(string name);
        Task<List<Role>> GetAllFilteredAsync(bool? isSysRole);
    }
}