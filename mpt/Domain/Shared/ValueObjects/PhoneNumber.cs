
using System.Text.RegularExpressions;
using Mpt.Core.Domain;

namespace Mpt.Domain.Shared
{
    public class PhoneNumber : IValueObject
    {
        public string Value { get; private set; }

    

        public PhoneNumber(string value, bool? isVerified = true)
        {
            if (isVerified == false)
            {
                this.Value = value;
                return;
            }
            
            if (!IsValidPhoneNumber(value))
            {
                throw new BusinessRuleValidationException("Invalid phone number");
            }

            this.Value = value;
        }

        private bool IsValidPhoneNumber(string phoneNumber)
        {
            // Regular expression pattern for phone number validation
            string pattern = @"^9\d{8}$";

            // Use Regex.IsMatch to check if the phone number matches the pattern
            return Regex.IsMatch(phoneNumber, pattern);
        }
    }
}


