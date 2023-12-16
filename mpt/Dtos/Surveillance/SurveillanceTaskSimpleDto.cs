namespace Mpt.Dtos
{
    public class SurveillanceTaskSimpleDto : TaskSimpleDto
    {
        public string PhoneNumber { get; private set; }
        public string FloorCode { get; set; }

        public SurveillanceTaskSimpleDto(bool isCompleted, string taskType, string phoneNumber, string floorCode, string isApproved)
            : base(isCompleted, taskType, isApproved)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorCode = floorCode;
        }

    }
}

