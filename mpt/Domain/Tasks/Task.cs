using Mpt.Core.Domain;
using Mpt.Domain.Plannings;
using Mpt.Domain.Shared;
using Mpt.Domain.Users;


namespace Mpt.Domain.Tasks
{

    public class Task : Entity<TaskId>, IAggregateRoot
    {
        // Properties
        public UserId UserId { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool? IsApproved { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public List<List<RobotMovement>> RobotMovements { get; private set; }
        public string OriginType { get; set; }
        public string Origin { get; set; }
        public string DestinyType { get; set; }
        public string Destiny { get; set; }

        // Navigation properties
        public List<PlanningTask> PlanningTasks { get; set; } = new List<PlanningTask>();


        // Constructors 
        public Task()
        {
        }

        public Task(UserId userId, string taskType, List<string> path, List<List<RobotMovement>> robotMovements,
            string originType, string origin, string destinyType, string destiny, bool? isApproved = null)
        {
            this.UserId = userId;
            this.TaskType = taskType;
            this.Path = path;
            this.RobotMovements = robotMovements;
            this.OriginType = originType;
            this.Origin = origin;
            this.DestinyType = destinyType;
            this.Destiny = destiny;
            this.IsApproved = isApproved;
        }

        // Methods
        public void CompleteTask()
        {
            if (this.IsApproved == false)
                throw new BusinessRuleValidationException("It is not possible to complete an unapproved task.");
            this.IsCompleted = true;
        }

        public void UncompleteTask()
        {
            this.IsCompleted = false;
        }

        public void AproveTask()
        {
            this.IsApproved = true;
        }

        public void DisaproveTask()
        {
            this.IsApproved = false;
        }


    }
}
