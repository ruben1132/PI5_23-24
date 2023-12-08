
namespace Mpt.Dtos
{
    public class CreateTaskDto
    {

        public string UserId { get; private set; }
        public string RobotId { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public List<RobotMovementDto> RobotMovements { get; private set; }


        public CreateTaskDto(string userId, string robotId, string taskType, List<string> path, List<RobotMovementDto> robotMovements)
        {
            this.UserId = userId;
            this.RobotId = robotId;
            this.TaskType = taskType;
            this.RobotMovements = robotMovements;
            this.Path = path;

        }


    }

}