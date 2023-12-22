using Mpt.Domain.Tasks;


namespace Mpt.Dtos
{
    public class PickupDeliveryTaskDto : TaskDto
    {
        public string PickupPersonName { get; private set; }
        public string PickupPersonPhoneNumber { get; private set; }
        public string DeliveryPersonName { get; private set; }
        public string DeliveryPersonPhoneNumber { get; private set; }
        public string TaskDescription { get; private set; }
        public string ConfirmationCode { get; private set; }
        public string OriginType { get; set; }
        public string Origin { get; set; }
        public string DestinyType { get; set; }
        public string Destiny { get; set; }

        public PickupDeliveryTaskDto(string id, List<string> path,
            bool isCompleted, string taskType, string pickupPersonName,
            string pickupPersonPhoneNumber, string deliveryPersonName, string deliveryPersonPhoneNumber,
            string taskDescription, string confirmationCode, string originType, string origin, string destinyType, 
            string destiny, UserTaskInfoDto user, string isApproved, string lastUpdated)
            : base(id, path, isCompleted, taskType, user, isApproved, lastUpdated)
        {
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.TaskDescription = taskDescription;
            this.ConfirmationCode = confirmationCode;
            this.OriginType = originType;
            this.Origin = origin;
            this.DestinyType = destinyType;
            this.Destiny = destiny;
        }

    }
}