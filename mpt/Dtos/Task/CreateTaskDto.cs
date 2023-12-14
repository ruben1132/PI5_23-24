
namespace Mpt.Dtos
{
    public class CreateTaskDto
    {

        public string UserId { get; private set; }
        public string TaskType { get; private set; }
        public List<string> Path { get; private set; }
        public List<List<RobotMovementDto>> RobotMovements { get; private set; }
        public string OriginType { get; set; }
        public string Origin { get; set; }
        public string DestinyType { get; set; }
        public string Destiny { get; set; }


        public CreateTaskDto(string userId, string taskType, List<string> path, List<List<RobotMovementDto>> robotMovements,
            string originType, string origin, string destinyType, string destiny)
        {
            this.UserId = userId;
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