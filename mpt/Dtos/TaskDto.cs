namespace Mpt.Dtos
{
    public class TaskDto
    {
        public string Id { get; private set; }
        public string UserId { get; private set; }
        public string RobotId { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool IsAproved { get; private set; }
        public string TaskType { get; private set; }


        public TaskDto(string id, string userId, string robotId, bool isCompleted, bool isAproved, string taskType)
        {
            this.Id = id;
            this.UserId = userId;
            this.RobotId = robotId;
            this.IsCompleted = isCompleted;
            this.IsAproved = isAproved;
            this.TaskType = taskType;

        }

    }
}

