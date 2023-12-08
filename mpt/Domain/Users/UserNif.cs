
using System.Text.RegularExpressions;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Users
{
    public class UserNif : IValueObject
    {
        public string Value { get; private set; }

        public UserNif(string value)
        {
            if (!IsValidUserNif(value))
            {
                throw new BusinessRuleValidationException("Invalid NIF");
            }

            this.Value = value;
        }

        private bool IsValidUserNif(string phoneNumber)
        {
            // Regular expression pattern for NIF validation
            string pattern = @"^\d{9}$";

            // Use Regex.IsMatch to check if the NIF matches the pattern
            return Regex.IsMatch(phoneNumber, pattern);
        }
    }
}


