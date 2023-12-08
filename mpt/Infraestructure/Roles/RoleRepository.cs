using Mpt.Domain.Roles;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;

namespace Mpt.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>, IRoleRepository
    {

        public RoleRepository(MptDbContext context) : base(context.Roles)
        {
        }

        public async Task<Role> GetByNameAsync(string name)
        {
            //  return await Task.FromResult(this._context.Roles.FirstOrDefault(x => x.Name == name));
            return null;
        }
    }
}