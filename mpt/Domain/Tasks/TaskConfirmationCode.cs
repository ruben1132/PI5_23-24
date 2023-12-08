using Mpt.Domain.Shared;
using System.Text.RegularExpressions;

namespace Mpt.Domain.Users
{
    public class TaskConfirmationCode : IValueObject
    {
        public string Value { get; private set; }

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


