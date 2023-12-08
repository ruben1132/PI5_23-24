namespace Mpt.Dtos
{
    public class TaskDto
    {
        public string Id { get; private set; }
        public string UserId { get; private set; }
        public string RobotId { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool? IsApproved { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public List<RobotMovementDto> RobotMovements { get; private set; }


        public TaskDto(string id, string userId, string robotId, List<string> path, List<RobotMovementDto> robotMovements, bool isCompleted, bool? isApproved, string taskType)
        {
            this.Id = id;
            this.UserId = userId;
            this.RobotId = robotId;
            this.IsCompleted = isCompleted;
            this.IsApproved = isApproved;
            this.TaskType = taskType;
            this.RobotMovements = robotMovements;
            this.Path = path;

        }

    }
}

