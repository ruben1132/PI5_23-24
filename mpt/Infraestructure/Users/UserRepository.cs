using Mpt.Domain.Users;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Mpt.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>,IUserRepository
    {
        private readonly MptDbContext _context;

        public UserRepository(MptDbContext context):base(context.Users)
        {
            this._context = context;
        }

        public Task<User> GetByEmailAsync(string email)
        {
            return this._context.Users.FirstOrDefaultAsync(u => u.Email.Value == email);
        }
    }
}