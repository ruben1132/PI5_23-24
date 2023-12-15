
namespace Mpt.Dtos
{
    public class TaskSimpleDto
    {
        public string TaskType { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool? IsApproved { get; private set; }

        public TaskSimpleDto(
            bool isCompleted, string taskType, bool? isApproved)
        {
            this.IsCompleted = isCompleted;
            this.IsApproved = isApproved;
            this.TaskType = taskType;
        }

    }
}

