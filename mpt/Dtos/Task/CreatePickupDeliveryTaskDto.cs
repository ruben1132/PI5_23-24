
namespace Mpt.Dtos
{
    public class CreatePickupDeliveryTaskDto : CreateTaskDto
    {
        public string PickupPersonName { get; private set; }
        public string PickupPersonPhoneNumber { get; private set; }
        public string DeliveryPersonName { get; private set; }
        public string DeliveryPersonPhoneNumber { get; private set; }
        public string TaskDescription { get; private set; }
        

        public CreatePickupDeliveryTaskDto(string originType, string origin, string destinyType, string destiny, string pickupPersonName, 
            string pickupPersonPhoneNumber, string deliveryPersonName, string deliveryPersonPhoneNumber, string taskDescription)

            : base( originType, origin, destinyType, destiny)
        {
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.TaskDescription = taskDescription;
        }


    }
}