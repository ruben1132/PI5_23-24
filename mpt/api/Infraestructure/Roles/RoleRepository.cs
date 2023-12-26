using Mpt.Domain.Roles;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Mpt.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>, IRoleRepository
    {

        private readonly IConfiguration _config;
        private readonly MptDbContext _context;

        public RoleRepository(IConfiguration config, MptDbContext context) : base(context.Roles)
        {
            this._config = config;
            this._context = context;
        }

        public async Task<Role> GetByNameAsync(string name)
        {
            return await this._context.Roles.FirstOrDefaultAsync(x => x.Name == name);
        }

        public async Task<List<Role>> GetAllFilteredAsync(bool? isSysRole)
        {
            // get default role
            var defaultRole = _config.GetValue<string>("DefaultRole") ?? "utente";

            var query = _context.Roles.AsQueryable();

            if (isSysRole == null)
                return await query.ToListAsync();

            query = isSysRole == true
                 ? query.Where(u => u.Name != defaultRole)
                 : query.Where(u => u.Name == defaultRole);

            return await query.ToListAsync();
        }
    }
}