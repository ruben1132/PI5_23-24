using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreatePickupDeliveryTaskDto : CreateTaskDto
    {
        public string PickupPlace { get; private set; }
        public string DeliveryPlace { get; private set; }
        public string PickupPersonName { get; private set; }
        public string PickupPersonPhoneNumber { get; private set; }
        public string DeliveryPersonName { get; private set; }
        public string DeliveryPersonPhoneNumber { get; private set; }
        public string TaskDescription { get; private set; }
        

        public CreatePickupDeliveryTaskDto(string userId, string robotId, string taskType,List<string> path, List<RobotMovementDto> robotMovements, string pickupPlace, string deliveryPlace, string pickupPersonName, string pickupPersonPhoneNumber, string deliveryPersonName, string deliveryPersonPhoneNumber, string taskDescription)
            : base(userId, robotId, taskType, path, robotMovements)
        {
            this.PickupPlace = pickupPlace;
            this.DeliveryPlace = deliveryPlace;
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.TaskDescription = taskDescription;
        }


    }
}