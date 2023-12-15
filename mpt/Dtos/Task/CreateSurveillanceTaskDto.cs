using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreateSurveillanceTaskDto : CreateTaskDto
    {
        public string PhoneNumber { get; private set; }

        public CreateSurveillanceTaskDto(string originType, string origin, 
            string destinyType, string destiny, string phoneNumber)

            : base(originType, origin, destinyType, destiny)
        {
            this.PhoneNumber = phoneNumber;
        }

    }
}

