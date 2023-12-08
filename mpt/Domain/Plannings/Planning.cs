using Mpt.Domain.Shared;
using Mpt.Domain.Tasks;
using Mpt.Domain.Users;


namespace Mpt.Domain.Plannings
{
    public class Planning : Entity<PlanningId>, IAggregateRoot
    {

        public int Cost { get; private set; }
        public UserId UserId { get; set; }

        // Navigation properties
        public List<PlanningTask> PlanningTasks { get; set; } = new List<PlanningTask>();


        // constructors
        private Planning()
        {
        }

        public Planning(int cost, UserId userId)
        {
            this.Id = new PlanningId(Guid.NewGuid());
            this.Cost = cost;
            this.UserId = userId;
        }

    }
}