using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class FloorInfoDto
    {
        public string Code { get; private set; }

        public FloorInfoDto(string code)
        {
            this.Code = code;
        }
    }
 
}
