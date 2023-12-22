
using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class UserDto
    {

        public string Id { get; set; }
        public string Email { get; private set; }
        public string Name { get; private set; }
        public string Phone { get; private set; }
        public string Nif { get; private set; }
        public string RoleId { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? Active { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string? Password { get; set; }

        public UserDto(string id, string email, string name, string phone, string nif, string roleId, bool? active = true, string? password = null)
        {
            this.Id = id;
            this.Email = email;
            this.Password = password;
            this.Name = name;
            this.Phone = phone;
            this.Nif = nif;
            this.Active = active;
            this.RoleId = roleId;
        }

    }

}