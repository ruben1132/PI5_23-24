namespace Mpt.Dtos
{
    public class SurveillanceTaskSimpleDto : TaskSimpleDto
    {
        public string PhoneNumber { get; private set; }
        public string FloorCode { get; set; }

        public SurveillanceTaskSimpleDto(bool isCompleted, string taskType, string phoneNumber, string floorCode, string isApproved, string lastUpdated)
            : base(isCompleted, taskType, isApproved, lastUpdated)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorCode = floorCode;
        }

    }
}

