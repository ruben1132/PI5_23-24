namespace Mpt.Dtos
{
    public class SurveillanceTaskDto : TaskDto
    {
        public string PhoneNumber { get; private set; }
        public string FloorCode { get; set; }

        public SurveillanceTaskDto(string id, List<string> path,
            bool isCompleted, string taskType, string phoneNumber, string floorCode, 
            UserTaskInfoDto user, string isApproved)
            : base(id, path, isCompleted, taskType, user, isApproved)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorCode = floorCode;
        }

    }
}

