namespace Mpt.Dtos
{
    public class CreateRoleDto
    {
        public string Name { get; private set; }

        public CreateRoleDto(string name)
        {
            this.Name = name;
        }

    }

}
