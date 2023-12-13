using Mpt.Core.Domain;
using System.Text.RegularExpressions;

namespace Mpt.Domain.Users
{
    public class UserEmail : IValueObject
    {
        public string Value { get; private set; }

        // required for EF 
        private UserEmail(string value)
        {
            this.Value = value;
        }

        public UserEmail(string value, string? emailDomain = null)
        {
            if (!IsValidEmail(value, emailDomain ?? "isep.ipp.pt"))
            {
                throw new BusinessRuleValidationException("Invalid email address");
            }

            this.Value = value;
        }

        private bool IsValidEmail(string email, string emailDomain)
        {
            // Regular expression pattern for email validation
            string pattern = @"^[a-zA-Z0-9._%+-]+@" + emailDomain + "$";

            // Use Regex.IsMatch to check if the email matches the pattern
            return Regex.IsMatch(email, pattern);
        }
    }
}


