using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class SurveillanceTaskDto : TaskDto
    {
        public string PhoneNumber { get; private set; }
        public List<string> FloorIds { get; set; }

        public SurveillanceTaskDto(string id, string userId, string robotId, bool isCompleted, bool isAproved, string taskType, string phoneNumber, List<string> floorIds)
            : base(id, userId, robotId, isCompleted, isAproved, taskType)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorIds = floorIds;
        }

    }
}

