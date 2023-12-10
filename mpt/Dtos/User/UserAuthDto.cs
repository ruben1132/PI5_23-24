namespace Mpt.Dtos
{
    public class UserAuthDto
    {
        public string Id { get; set; }
        public string Email { get; private set; }
        public string Name { get; private set; }
        public RoleDto Role { get; private set; }

        public UserAuthDto(string id, string email, string name, RoleDto role)
        {
            this.Id = id;
            this.Email = email;
            this.Name = name;
            this.Role = role;
            this.Role.IsActive = null;
        }

    }

}
