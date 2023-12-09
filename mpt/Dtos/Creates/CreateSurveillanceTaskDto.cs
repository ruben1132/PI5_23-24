using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreateSurveillanceTaskDto : CreateTaskDto
    {
        public string PhoneNumber { get; private set; }
        public List<string> FloorIds { get; set; }

        public CreateSurveillanceTaskDto(string userId, string taskType, List<string> path, List<RobotMovementDto> robotMovements, string phoneNumber, List<string> floorIds)
            : base(userId, taskType, path, robotMovements)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorIds = floorIds;
        }

    }
}

