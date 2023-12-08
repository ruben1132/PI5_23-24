using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreateSurveillanceTaskDto : CreateTaskDto
    {
        public string PhoneNumber { get; private set; }
        public List<string> FloorIds { get; set; }

        public CreateSurveillanceTaskDto(string userId, string robotId, string taskType, string phoneNumber, List<string> floorIds)
            : base(userId, robotId, taskType)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorIds = floorIds;
        }

    }
}

