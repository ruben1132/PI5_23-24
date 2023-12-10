namespace Mpt.Dtos
{
    public class UserWithRoleAndTokenDto
    {
        public string Token { get; private set; }
        public UserWithRoleDto User { get; private set; }

        public UserWithRoleAndTokenDto(string token, UserWithRoleDto user)
        {
            this.Token = token;
            this.User = user;
        }

    }
}
