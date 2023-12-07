using Mpt.Domain.Shared;

namespace Domain.User
{
    public class UserPassword : IValueObject
    {
          public string Value { get; private set; }

        public UserPassword(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new BusinessRuleValidationException("Password cannot be empty.");
            }

            if (value.Length < 10)
            {
                throw new BusinessRuleValidationException("Password must be at least 10 characters long.");
            }

            if (!value.Any(char.IsUpper))
            {
                throw new BusinessRuleValidationException("Password must contain at least one uppercase letter.");
            }

            if (!value.Any(char.IsLower))
            {
                throw new BusinessRuleValidationException("Password must contain at least one lowercase letter.");
            }

            if (!value.Any(char.IsDigit))
            {
                throw new BusinessRuleValidationException("Password must contain at least one digit.");
            }

            if (!value.Any(char.IsSymbol) && !value.Any(char.IsPunctuation))
            {
                throw new BusinessRuleValidationException("Password must contain at least one symbol.");
            }

            this.Value = value;
        }

    }
}
