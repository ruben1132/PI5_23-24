using Mpt.Core.Domain;
using Mpt.Domain.Tasks;

namespace Mpt.IRepositories
{
    public interface ITaskRepository: IRepository<Domain.Tasks.Task,TaskId>
    {

        Task<List<Mpt.Domain.Tasks.Task>> GetAllFilteredAsync(string type, bool? isApproved, string? userId);

    }
}