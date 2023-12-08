using Mpt.Domain.Shared;
using Mpt.Domain.Users;


namespace Mpt.Domain.Tasks
{

    public class Task : Entity<TaskId>, IAggregateRoot
    {
        // Properties
        public UserId UserId { get; private set; }
        public string RobotId { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool IsAproved { get; private set; } // este valor na BD tem de entrar como null
        public TaskType TaskType { get; private set; }

        // Constructors
        private Task()
        {
        }

        public Task(UserId userId, string robotId, TaskType taskType)
        {
            this.Id = new TaskId(Guid.NewGuid());
            this.UserId = userId;
            this.RobotId = robotId;
            this.IsCompleted = false;
            this.TaskType = taskType;
        }

        // Methods
        public void CompleteTask()
        {
            if (!this.IsAproved)
                throw new BusinessRuleValidationException("It is not possible to complete an unapproved task.");
            this.IsCompleted = true;
        }

        public void UncompleteTask()
        {
            this.IsCompleted = false;
        }

        public void AproveTask()
        {
            this.IsAproved = true;
        }

        public void DisaproveTask()
        {
            this.IsAproved = false;
        }


    }
}
