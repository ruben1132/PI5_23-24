
namespace Mpt.Dtos
{
    public class TaskSimpleDto
    {
        public string TaskType { get; private set; }
        public bool IsCompleted { get; private set; }
        public string IsApproved { get; private set; }

        public TaskSimpleDto(
            bool isCompleted, string taskType, string isApproved)
        {
            this.IsCompleted = isCompleted;
            this.IsApproved = isApproved;
            this.TaskType = taskType;
        }

    }
}

