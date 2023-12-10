namespace Mpt.Dtos
{
    public class UserLoginDto
    {
        public string Email { get; private set; }
        public string Password { get; private set; }

        public UserLoginDto(string email, string password)
        {
            this.Email = email;
            this.Password = password;
        }

    }

}
