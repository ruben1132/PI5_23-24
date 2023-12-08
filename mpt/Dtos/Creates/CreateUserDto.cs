
namespace Mpt.Dtos
{
    public class CreateUserDto
    {

        public string Email { get; private set; }
        public string Password { get; set; }
        public string Name { get; private set; }
        public string Phone { get; private set; }
        public string Nif { get; private set; }
        public string RoleId { get; set; }
  
        public CreateUserDto(string email, string password, string name, string phone, string nif, string roleId)
        {
            this.Email = email;
            this.Password = password;
            this.Name = name;
            this.Phone = phone;
            this.Nif = nif;
            this.RoleId = roleId;
        }

    }

}