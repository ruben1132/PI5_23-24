using Mpt.Domain.Users;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Mpt.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>, IUserRepository
    {
        private readonly MptDbContext _context;
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config, MptDbContext context) : base(context.Users)
        {
            this._context = context;
            this._config = config;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await this._context.Users.FirstOrDefaultAsync(u => u.Email.Value == email);
        }

        public async Task<List<User>> GetAllFilteredAsync(bool isSysUser, ApprovalStatus? isApproved = null)
        {

            // get default role
            var defaultRole = _config.GetValue<string>("DefaultRole") ?? "utente";
            
            var query = _context.Users.AsQueryable();
            query = isSysUser
                ? query.Where(u => _context.Roles.Any(r => r.Id == u.RoleId && r.Name != defaultRole))
                : query.Where(u => _context.Roles.Any(r => r.Id == u.RoleId && r.Name == defaultRole));

            // if isApproved is null, then it will return all users
            if (isApproved != null)
                query = query.Where(u => u.IsApproved == isApproved);
          
            return await query.ToListAsync();
        }
    }
}