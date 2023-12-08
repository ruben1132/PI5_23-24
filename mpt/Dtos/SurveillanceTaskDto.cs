using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class SurveillanceTaskDto : TaskDto
    {
        public string PhoneNumber { get; private set; }
        public List<string> FloorIds { get; set; }

        public SurveillanceTaskDto(string id, string userId, string robotId, List<string> path, List<RobotMovementDto> robotMovements, bool isCompleted, bool? isApproved, string taskType, string phoneNumber, List<string> floorIds)
            : base(id, userId, robotId, path, robotMovements, isCompleted, isApproved, taskType)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorIds = floorIds;
        }

    }
}

