using Mpt.Domain.Tasks;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;

namespace Mpt.Infrastructure.Tasks
{
    public class TaskRepository : BaseRepository<Domain.Tasks.Task, TaskId>,ITaskRepository
    {
        public TaskRepository(MptDbContext context):base(context.Tasks)
        {
           
        }
    }
}