using Domain.Users;
using Mpt.Core.Domain;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;


namespace Mpt.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {
        // Properties
        public UserEmail Email { get; private set; }
        public UserPassword Password { get; private set; }
        public string Name { get; private set; }
        public PhoneNumber Phone { get; private set; }
        public UserNif Nif { get; private set; }
        public bool Active { get; private set; }
        public RoleId RoleId { get; private set; }
        public bool? IsApproved { get; private set; }

        // Constructors
        private User()
        {
        }

        public User(UserEmail email, string name, PhoneNumber phone, UserNif nif, RoleId roleId, UserPassword password, bool? isApproved = null)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name cannot be null.");

            this.Id = new UserId(Guid.NewGuid());
            this.Active = true;
            this.Email = email;
            this.Password = password;
            this.Name = name;
            this.Phone = phone;
            this.Nif = nif;
            this.RoleId = roleId;
            this.IsApproved = isApproved;
        }


        // Methods
        public void ChangePassword(UserPassword password)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the password to an inactive user.");
            this.Password = password;
        }

        public void ChangeEmail(UserEmail email)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the email to an inactive user.");
            this.Email = email;
        }

        public void ChangeName(string name)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the name to an inactive user.");

            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name cannot be null.");

            this.Name = name;
        }

        public void ChangePhone(PhoneNumber phone)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the phone to an inactive user.");
            this.Phone = phone;
        }

        public void ChangeNif(UserNif nif)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the nif to an inactive user.");
            this.Nif = nif;
        }

        public void Enable()
        {
            this.Active = true;
        }

        public void Disable()
        {
            this.Active = false;
        }

        public void ChangeRole(RoleId roleId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the role to an inactive user.");
            this.RoleId = roleId;
        }

        public void Approve()
        {
            this.IsApproved = true;
        }

        public void Disapprove()
        {
            this.IsApproved = false;
        }
    }
}
