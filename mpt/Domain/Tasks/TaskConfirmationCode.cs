using Mpt.Domain.Shared;
using System.Text.RegularExpressions;

namespace Mpt.Domain.Users
{
    public class TaskConfirmationCode : IValueObject
    {
        public string Value { get; private set; }

        public TaskConfirmationCode(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new BusinessRuleValidationException("The confirmation code cannot be empty.");

            if (!Regex.IsMatch(value, @"^[a-zA-Z0-9]+$"))
                throw new BusinessRuleValidationException("The confirmation code must contain only letters and numbers.");

            if (value.Length != 6)
                throw new BusinessRuleValidationException("The confirmation code must have 6 characters.");

            this.Value = value;
        }
        
        public TaskConfirmationCode()
        {
            // generate random code
            string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            string code = new string(Enumerable.Repeat(characters, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            this.Value = code;
        }


    }
}


