using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreateSurveillanceTaskDto : CreateTaskDto
    {
        public string PhoneNumber { get; private set; }
        public string FloorId { get; private set; }

        public CreateSurveillanceTaskDto(string taskType, string floorId, string phoneNumber)

            : base(taskType)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorId = floorId;
        }

    }
}

