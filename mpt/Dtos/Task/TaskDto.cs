using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class TaskDto
    {
        public string Id { get; private set; }
        
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public UserTaskInfoDto? User { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool? IsApproved { get; private set; }

        public TaskDto(string id, List<string> path,
            bool isCompleted, string taskType, UserTaskInfoDto? user, bool? isApproved)
        {
            this.Id = id;
            this.User = user;
            this.IsCompleted = isCompleted;
            this.IsApproved = isApproved;
            this.TaskType = taskType;
            this.Path = path;
        }

    }
}

