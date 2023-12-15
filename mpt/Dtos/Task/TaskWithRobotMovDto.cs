using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class TaskWithRobotMovDto
    {
        public string Id { get; private set; }
        
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public UserTaskInfoDto? User { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public List<List<RobotMovementDto>> RobotMovements { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool? IsApproved { get; private set; }

        public TaskWithRobotMovDto(string id, List<string> path, List<List<RobotMovementDto>> robotMovements,
            bool isCompleted, string taskType, UserTaskInfoDto? user, bool? isApproved)
        {
            this.Id = id;
            this.User = user;
            this.IsCompleted = isCompleted;
            this.IsApproved = isApproved;
            this.TaskType = taskType;
            this.RobotMovements = robotMovements;
            this.Path = path;
        }

    }
}

