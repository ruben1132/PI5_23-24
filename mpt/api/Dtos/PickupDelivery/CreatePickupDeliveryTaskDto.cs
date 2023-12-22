
namespace Mpt.Dtos
{
    public class CreatePickupDeliveryTaskDto
    {
        public string PickupPersonName { get; private set; }
        public string PickupPersonPhoneNumber { get; private set; }
        public string DeliveryPersonName { get; private set; }
        public string DeliveryPersonPhoneNumber { get; private set; }
        public string TaskDescription { get; private set; }
        public string ParsedOrigin { get; set; }
        public string OriginType { get; set; }
        public string Origin { get; set; }
        public string ParsedDestiny { get; set; }
        public string DestinyType { get; set; }
        public string Destiny { get; set; }


        public CreatePickupDeliveryTaskDto(string pickupPersonName,
            string pickupPersonPhoneNumber, string deliveryPersonName, string deliveryPersonPhoneNumber, string taskDescription,
            string originType, string origin, string destinyType, string destiny, string parsedOrigin, string parsedDestiny)
        {
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.TaskDescription = taskDescription;
            this.OriginType = originType;
            this.Origin = origin;
            this.DestinyType = destinyType;
            this.Destiny = destiny;
            this.ParsedOrigin = parsedOrigin;
            this.ParsedDestiny = parsedDestiny;
        }

    }
}