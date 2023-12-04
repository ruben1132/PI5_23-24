using System.Threading.Tasks;

namespace Mpt.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}