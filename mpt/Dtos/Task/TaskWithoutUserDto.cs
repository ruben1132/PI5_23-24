using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class TaskWithoutUserDto
    {
        public string Id { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public bool IsCompleted { get; private set; }
        public string IsApproved { get; private set; }

        public TaskWithoutUserDto(string id, List<string> path, bool isCompleted, string taskType, string isApproved)
        {
            this.Id = id;
            this.IsCompleted = isCompleted;
            this.IsApproved = isApproved;
            this.TaskType = taskType;
            this.Path = path;
        }

    }
}

