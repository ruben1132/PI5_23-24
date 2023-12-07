using Mpt.Domain.Shared;
using System.Text.RegularExpressions;

namespace Mpt.Domain.Users
{
    public class UserEmail : IValueObject
    {
        public string Value { get; private set; }

        public UserEmail(string value)
        {
            if (!IsValidEmail(value))
            {
                throw new BusinessRuleValidationException("Invalid email address");
            }

            this.Value = value;
        }

        private bool IsValidEmail(string email)
        {
            // Regular expression pattern for email validation
            string pattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";

            // Use Regex.IsMatch to check if the email matches the pattern
            return Regex.IsMatch(email, pattern);
        }
    }
}


