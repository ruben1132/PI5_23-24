namespace Mpt.Dtos
{
    public class RoleDto
    {
        public string Id { get; private set; }
        public string Name { get; private set; }

        public RoleDto(string id, string name)
        {
            this.Id = id;
            this.Name = name;
        }

    }

}
