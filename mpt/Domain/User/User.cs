using Domain.User;
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
        // public Role Role { get; private set; } TODO: Implementar role e relacionamento

        // TODO: relacionamento com tasks
        // TODO: relacionamento com role

        // Constructor
        private User(UserEmail email, UserPassword password, string name, PhoneNumber phone, UserNif nif)
        {
            this.Active = true;
            this.Email = email;
            this.Password = password;
            this.Name = name;
            this.Phone = phone;
            this.Nif = nif;
        }

        public User Create(UserEmail email, UserPassword password, string name, PhoneNumber phone, UserNif nif)
        {
            var newId = new UserId(Guid.NewGuid());

            if (string.IsNullOrWhiteSpace(name))
                throw new BusinessRuleValidationException("Name cannot be null.");

            return new User(email, password, name, phone, nif);
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
    }
}
