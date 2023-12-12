using Mpt.Core.Domain;
using Mpt.Domain.Shared;
using Mpt.Domain.Users;

namespace Mpt.IRepositories
{
    public interface IUserRepository: IRepository<User,UserId>
    {
        Task<User> GetByEmailAsync(string email);
    }
}