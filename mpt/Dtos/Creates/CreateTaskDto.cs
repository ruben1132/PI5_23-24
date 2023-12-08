
namespace Mpt.Dtos
{
    public class CreateTaskDto
    {

        public string UserId { get; private set; }
        public string RobotId { get; private set; }
        public string TaskType { get; private set; }

        public CreateTaskDto(string userId, string robotId, string taskType)
        {
            this.UserId = userId;
            this.RobotId = robotId;
            this.TaskType = taskType;

        }


    }

}