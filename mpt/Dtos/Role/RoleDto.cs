using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class RoleDto
    {
        public string Id { get; private set; }
        public string Name { get; private set; }
        
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? IsActive { get; set; }

        public RoleDto(string id, string name, bool? isActive = null)
        {
            this.Id = id;
            this.Name = name;
            this.IsActive = isActive;
        }

    }

}
