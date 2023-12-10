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
        public List<RobotMovement> RobotMovements { get; private set; }

        // Navigation properties
         public List<PlanningTask> PlanningTasks { get; set; } = new List<PlanningTask>();


        // Constructors 
        public Task()
        {
        }

        public Task(UserId userId, string taskType, List<string> path, List<RobotMovement> robotMovements, bool? isApproved = null)
        {
            this.Id = new TaskId(Guid.NewGuid());
            this.UserId = userId;
            this.IsCompleted = false;
            this.TaskType = taskType;
            this.Path = path;
            this.RobotMovements = robotMovements;
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
