using Mpt.Domain.Roles;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;
using Microsoft.EntityFrameworkCore;


namespace Mpt.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>, IRoleRepository
    {

        private readonly MptDbContext _context;

        public RoleRepository(MptDbContext context) : base(context.Roles)
        {
            this._context = context;
        }

        public async Task<Role> GetByNameAsync(string name)
        {
            return await this._context.Roles.FirstOrDefaultAsync(x => x.Name == name);
        }
    }
}