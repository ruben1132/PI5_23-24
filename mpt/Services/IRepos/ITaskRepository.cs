using Mpt.Core.Domain;
using Mpt.Domain.Tasks;

namespace Mpt.IRepositories
{
    public interface ITaskRepository: IRepository<Domain.Tasks.Task,TaskId>
    {

        Task<List<Mpt.Domain.Tasks.Task>> GetAllFilteredAsync(string? type, string? userId, ApprovalStatus? isApproved);

        Task<List<Mpt.Dtos.TaskWithoutUserDto>> GetTasksWithoutUserInfo(string userId);

    }
}