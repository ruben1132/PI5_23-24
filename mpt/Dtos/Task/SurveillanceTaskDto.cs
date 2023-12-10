using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class SurveillanceTaskDto : TaskDto
    {
        public string PhoneNumber { get; private set; }
        public List<string> FloorIds { get; set; }

        public SurveillanceTaskDto(string id, string userId, List<string> path, List<RobotMovementDto> robotMovements, bool isCompleted, string taskType, string phoneNumber, List<string> floorIds, bool? isApproved=null)
            : base(id, userId, path, robotMovements, isCompleted, taskType, isApproved)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorIds = floorIds;
        }

    }
}

