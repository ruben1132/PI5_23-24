
using Newtonsoft.Json;

namespace Mpt.Dtos
{
    public class UserTaskInfoDto
    {
        public string Email { get; private set; }
        public string Name { get; private set; }
        public string Phone { get; private set; }

        public UserTaskInfoDto(string email, string name, string phone)
        {
            this.Email = email;
            this.Name = name;
            this.Phone = phone;
        }

    }

}