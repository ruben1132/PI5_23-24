using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class PlanningDto
    {
        public string Id { get; private set; }
        public List<TaskId> Tasks { get; private set; }
        public int Cost { get; private set; }
        public string UserId { get; set; }

        public PlanningDto(string id, List<TaskId> tasks, int cost, string userId)
        {
            this.Id = id;
            this.Tasks = tasks;
            this.Cost = cost;
            this.UserId = userId;
        }

    }

}
