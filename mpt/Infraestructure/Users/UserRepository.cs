using Mpt.Domain.Users;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;

namespace Mpt.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>,IUserRepository
    {
        public UserRepository(MptDbContext context):base(context.Users)
        {
           
        }
    }
}