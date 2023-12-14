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

        public PickupDeliveryTaskDto(string id, string userId, List<string> path, List<List<RobotMovementDto>> robotMovements,
            string originType, string origin, string destinyType, string destiny,
            bool isCompleted, string taskType, string pickupPersonName, string pickupPersonPhoneNumber,
            string deliveryPersonName, string deliveryPersonPhoneNumber, string taskDescription,
            string confirmationCode, bool? isApproved = null)

            : base(id, userId, path, robotMovements, originType, origin, destinyType, destiny, isCompleted, taskType, isApproved)
        {
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.TaskDescription = taskDescription;
            this.ConfirmationCode = confirmationCode;
        }

    }
}