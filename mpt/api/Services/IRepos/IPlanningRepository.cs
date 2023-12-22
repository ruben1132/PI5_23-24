using Mpt.Domain.Shared;
using Mpt.Domain.Plannings;
using Mpt.Core.Domain;

namespace Mpt.IRepositories
{
    public interface IPlanningRepository: IRepository<Planning,PlanningId>
    {
        Task<List<Domain.Tasks.Task>> GetTasksForPlanningAsync(PlanningId planningId);
    }
}