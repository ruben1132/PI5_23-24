using Mpt.Domain.Shared;
using Mpt.Domain.Users;

namespace Mpt.Domain.Tasks
{
    public class SurveillanceTask : Task
    {

        public PhoneNumber PhoneNumber { get; private set; }
        public List<string> FloorIds { get; private set; }


        // Constructors
        
        public SurveillanceTask(UserId userId, string robotId, TaskType taskType, PhoneNumber phoneNumber, List<string> floorIds)
            : base(userId, robotId, taskType)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorIds = floorIds;
            
        }

        public void ChangePhoneNumber(PhoneNumber phoneNumber)
        {
            if (!base.IsAproved)
                throw new BusinessRuleValidationException("It is not possible to change the phone number of an unapproved task.");

            if (base.IsCompleted)
                throw new BusinessRuleValidationException("It is not possible to change the phone number of a completed task.");

            this.PhoneNumber = phoneNumber;
        }

    }
}