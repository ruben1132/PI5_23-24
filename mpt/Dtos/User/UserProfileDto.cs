
using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class UserProfileDto
    {

        public string Email { get; private set; }
        public string Name { get; private set; }
        public string Phone { get; private set; }
        public string Nif { get; private set; }


        public UserProfileDto(string email, string name, string phone, string nif)
        {
            this.Email = email;
            this.Name = name;
            this.Phone = phone;
            this.Nif = nif;
        }

    }

}