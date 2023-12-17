using Mpt.Domain.Tasks;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;

namespace Mpt.Infrastructure.Tasks
{
    public class TaskRepository : BaseRepository<Domain.Tasks.Task, TaskId>, ITaskRepository
    {
        public TaskRepository(MptDbContext context) : base(context.Tasks)
        {

        }

        public async Task<List<Domain.Tasks.Task>> GetAllFilteredAsync(string? type, string? userId, ApprovalStatus? isApproved = null)
        {
            var tasks = await this.GetAllAsync();

            if (type != null)
                tasks = tasks.Where(t => t.TaskType == type).ToList();

            if (isApproved != null)
                tasks = tasks.Where(t => t.IsApproved == isApproved).ToList();

            if (userId != null)
                tasks = tasks.Where(t => t.UserId.Value == userId).ToList();

            return tasks;
        }

        public async Task<List<Mpt.Dtos.TaskWithoutUserDto>> GetTasksWithoutUserInfo(string userId)
        {
            var tasks = await this.GetAllAsync();
            tasks = tasks.Where(t => t.UserId.Value == userId).ToList();

            var tasksWithoutUserInfo = new List<Mpt.Dtos.TaskWithoutUserDto>();

            foreach (var task in tasks)
            {
                tasksWithoutUserInfo.Add(new Mpt.Dtos.TaskWithoutUserDto(task.Id.ToString(), task.Path, task.IsCompleted, task.TaskType, task.IsApproved.ToString()));
            }

            return tasksWithoutUserInfo;
        }
    }
}