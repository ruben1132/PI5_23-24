using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class SurveillanceTaskDto : TaskDto
    {
        public string PhoneNumber { get; private set; }

        public SurveillanceTaskDto(string id, string userId, List<string> path, List<List<RobotMovementDto>> robotMovements, 
            string originType, string origin, string destinyType, string destiny,
            bool isCompleted, string taskType, string phoneNumber, bool? isApproved=null)
            
            : base(id, userId, path, robotMovements, originType, origin, destinyType, destiny, isCompleted, taskType, isApproved)
        {
            this.PhoneNumber = phoneNumber;
        }

    }
}

