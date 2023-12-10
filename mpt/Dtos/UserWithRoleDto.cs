namespace Mpt.Dtos
{
    public class UserWithRoleDto
    {

        public string Id { get; set; }
        public string Email { get; private set; }
        public string Password { get; set; }
        public string Name { get; private set; }
        public string Phone { get; private set; }
        public string Nif { get; private set; }
        public bool Active { get; private set; }
        public RoleDto? Role { get; private set; }
        public string? RoleId { get; set; }
        public bool? IsApproved { get; set; }

        public UserWithRoleDto(string id, string email, string password, string name, string phone, string nif, bool active, RoleDto role, bool? isApproved = null)
        {
            this.Id = id;
            this.Email = email;
            this.Password = password;
            this.Name = name;
            this.Phone = phone;
            this.Nif = nif;
            this.Active = active;
            this.Role = role;
            this.IsApproved = isApproved;
        }


    }

}