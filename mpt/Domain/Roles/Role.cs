using Mpt.Core.Domain;
using Mpt.Domain.Shared;


namespace Mpt.Domain.Roles
{
    public class Role : Entity<RoleId>, IAggregateRoot
    {

        public string Name { get; private set; }
        public bool Active { get; private set; }

        // constructors
        private Role()
        {
        }
        public Role(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Role name cannot be null.");


            this.Id = new RoleId(Guid.NewGuid());
            this.Name = name;
            this.Active = true;
        }

        public void ChangeName(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive role.");
            this.Name = description;
        }
        public void Enable()
        {
            this.Active = true;
        }

        public void Disable()
        {
            this.Active = false;
        }
    }
}