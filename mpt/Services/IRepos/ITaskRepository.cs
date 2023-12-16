using Mpt.Core.Domain;
using Mpt.Domain.Tasks;

namespace Mpt.IRepositories
{
    public interface ITaskRepository: IRepository<Domain.Tasks.Task,TaskId>
    {

        Task<List<Domain.Tasks.Task>> GetAllFilteredAsync(string? type, string? userId, ApprovalStatus? isApproved);
        Task<List<Domain.Tasks.Task>> GetByIds( List<TaskId> ids);

    }
}