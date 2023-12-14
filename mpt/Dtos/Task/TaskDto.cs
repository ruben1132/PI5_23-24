namespace Mpt.Dtos
{
    public class TaskDto
    {
        public string Id { get; private set; }
        public string UserId { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public List<List<RobotMovementDto>> RobotMovements { get; private set; }
        public string OriginType { get; set; }
        public string Origin { get; set; }
        public string DestinyType { get; set; }
        public string Destiny { get; set; }
        public bool IsCompleted { get; private set; }
        public bool? IsApproved { get; private set; }

        public TaskDto(string id, string userId, List<string> path, List<List<RobotMovementDto>> robotMovements, 
            string originType, string origin, string destinyType, string destiny,
            bool isCompleted, string taskType, bool? isApproved)
        {
            this.Id = id;
            this.UserId = userId;
            this.IsCompleted = isCompleted;
            this.IsApproved = isApproved;
            this.TaskType = taskType;
            this.RobotMovements = robotMovements;
            this.Path = path;
            this.OriginType = originType;
            this.Origin = origin;
            this.DestinyType = destinyType;
            this.Destiny = destiny;
        }

    }
}

