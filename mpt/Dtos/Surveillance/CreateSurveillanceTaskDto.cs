using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreateSurveillanceTaskDto
    {
        public string PhoneNumber { get; private set; }
        public string FloorId { get; private set; }

        public CreateSurveillanceTaskDto(string floorId, string phoneNumber)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorId = floorId;
        }

    }
}

