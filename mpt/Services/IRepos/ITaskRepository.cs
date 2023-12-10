using Mpt.Core.Domain;
using Mpt.Domain.Shared;
using Mpt.Domain.Tasks;

namespace Mpt.IRepositories
{
    public interface ITaskRepository: IRepository<Domain.Tasks.Task,TaskId>
    {
    }
}