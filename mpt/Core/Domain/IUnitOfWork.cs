using System.Threading.Tasks;

namespace Mpt.Core.Domain
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}