using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class PickupDeliveryTaskDto : TaskDto
    {
        public string PickupPlace { get; private set; }
        public string DeliveryPlace { get; private set; }
        public string PickupPersonName { get; private set; }
        public string PickupPersonPhoneNumber { get; private set; }
        public string DeliveryPersonName { get; private set; }
        public string DeliveryPersonPhoneNumber { get; private set; }
        public string TaskDescription { get; private set; }
        public string ConfirmationCode { get; private set; }

        public PickupDeliveryTaskDto(string id, string userId, List<string> path, List<RobotMovementDto> robotMovements, bool isCompleted, bool? isApproved, string taskType, string pickupPlace, string deliveryPlace, string pickupPersonName, string pickupPersonPhoneNumber, string deliveryPersonName, string deliveryPersonPhoneNumber, string taskDescription, string confirmationCode)
            : base(id, userId, path, robotMovements, isCompleted, isApproved, taskType)
        {
            this.PickupPlace = pickupPlace;
            this.DeliveryPlace = deliveryPlace;
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.TaskDescription = taskDescription;
            this.ConfirmationCode = confirmationCode;
        }

    }
}