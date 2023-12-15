
namespace Mpt.Dtos
{
    public class PathMovementDto
    {
        public List<string> Path { get; private set; }
        public List<List<RobotMovementDto>> Movements { get; private set; }

        public PathMovementDto(List<string> path, List<List<RobotMovementDto>> movements)
        {
            this.Path = path;
            this.Movements = movements;
        }


    }
}