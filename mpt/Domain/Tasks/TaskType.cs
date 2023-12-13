using Mpt.Core.Domain;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Users
{
    public class TaskType : IValueObject
    {
        public string Value { get; private set; }

        public TaskType(string value)
        {
            if (!IsValidTaskType(value))
            {
                throw new BusinessRuleValidationException("Invalid task type");
            }

            this.Value = value;
        }

        private bool IsValidTaskType(string type)
        {
            if (string.Equals(type, "Surveillance") || string.Equals(type, "Pickup&Delivery"))
                return true;
            else
                return false;
        }
    }
}


