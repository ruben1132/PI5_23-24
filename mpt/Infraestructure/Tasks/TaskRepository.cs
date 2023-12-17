using Mpt.Domain.Tasks;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;

namespace Mpt.Infrastructure.Tasks
{
    public class TaskRepository : BaseRepository<Domain.Tasks.Task, TaskId>, ITaskRepository
    {

        private readonly MptDbContext _context;

        public TaskRepository(MptDbContext context) : base(context.Tasks)
        {
            this._context = context;
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

        public async Task<List<Mpt.Dtos.TaskSimpleDto>> GetTasksWithoutUserInfo(string userId)
        {
            var tasks = await this.GetAllAsync();
            tasks = tasks.Where(t => t.UserId.Value == userId).ToList();

            var tasksWithoutUserInfo = new List<Mpt.Dtos.TaskSimpleDto>();

            foreach (var task in tasks)
            {
                tasksWithoutUserInfo.Add(new Mpt.Dtos.TaskSimpleDto(task.IsCompleted, task.TaskType, task.IsApproved.ToString()));
            }

            return tasksWithoutUserInfo;
        }
    }
}