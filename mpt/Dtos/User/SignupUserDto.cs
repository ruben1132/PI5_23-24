namespace Mpt.Dtos
{
    public class    SignupUserDto
    {
         public string Email { get; private set; }
        public string Password { get; set; }
        public string Name { get; private set; }
        public string Phone { get; private set; }
        public string Nif { get; private set; }
  
        public SignupUserDto(string email, string password, string name, string phone, string nif)
        {
            this.Email = email;
            this.Password = password;
            this.Name = name;
            this.Phone = phone;
            this.Nif = nif;
        }
    }

}
