using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class FloorInfoDto
    {
        public string FloorId { get; private set; }

        public FloorInfoDto(string token)
        {
            this.Token = token;
        }

    }
 
}
