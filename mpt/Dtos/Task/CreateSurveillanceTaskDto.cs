using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreateSurveillanceTaskDto : CreateTaskDto
    {
        public string PhoneNumber { get; private set; }

        public CreateSurveillanceTaskDto(string userId, string taskType, List<string> path, List<List<RobotMovementDto>> robotMovements,
            string originType, string origin, string destinyType, string destiny,
            string phoneNumber)

            : base(userId, taskType, path, robotMovements, originType, origin, destinyType, destiny)
        {
            this.PhoneNumber = phoneNumber;
        }

    }
}

