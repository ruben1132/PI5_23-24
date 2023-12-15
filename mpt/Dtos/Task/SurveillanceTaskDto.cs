using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class SurveillanceTaskDto : TaskDto
    {
        public string PhoneNumber { get; private set; }

        public SurveillanceTaskDto(string id, List<string> path, List<List<RobotMovementDto>> robotMovements, 
            string originType, string origin, string destinyType, string destiny,
            bool isCompleted, string taskType, string phoneNumber, UserTaskInfoDto? user = null, bool? isApproved=null)
            
            : base(id, path, robotMovements, originType, origin, destinyType, destiny, isCompleted, taskType, user, isApproved)
        {
            this.PhoneNumber = phoneNumber;
        }

    }
}

