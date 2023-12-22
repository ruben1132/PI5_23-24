using Mpt.Domain.Plannings;
using Mpt.Infrastructure.Shared;
using Mpt.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Mpt.Infrastructure.Plannings
{
    public class PlanningRepository : BaseRepository<Planning, PlanningId>, IPlanningRepository
    {

        private readonly MptDbContext _dbContext;

        public PlanningRepository(MptDbContext context) : base(context.Plannings)
        {
            this._dbContext = context;
        }

        public async Task<List<Domain.Tasks.Task>> GetTasksForPlanningAsync(PlanningId planningId)
        {
            return await this._dbContext.PlanningTasks
                .Where(pt => pt.PlanningId == planningId)
                .Select(pt => pt.Task)
                 .ToListAsync();
        }
    }
}