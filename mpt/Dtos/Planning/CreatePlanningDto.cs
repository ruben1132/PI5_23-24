using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreatePlanningDto
    {
        public List<TaskId> Tasks { get; private set; }
        public int Cost { get; private set; }
        public int SequenceOrder { get; set; }
        public string UserId { get; set; }

        public CreatePlanningDto(List<TaskId> tasks, int cost, int sequenceOrder, string userId)
        {
            this.Tasks = tasks;
            this.Cost = cost;
            this.SequenceOrder = sequenceOrder;
            this.UserId = userId;
        }

    }

}
