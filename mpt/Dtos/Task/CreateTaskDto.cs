
namespace Mpt.Dtos
{
    public class CreateTaskDto
    {

        public string UserId { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public List<RobotMovementDto> RobotMovements { get; private set; }


        public CreateTaskDto(string userId, string taskType, List<string> path, List<RobotMovementDto> robotMovements)
        {
            this.UserId = userId;
            this.TaskType = taskType;
            this.RobotMovements = robotMovements;
            this.Path = path;

        }


    }

}