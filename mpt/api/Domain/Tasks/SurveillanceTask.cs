using Mpt.Core.Domain;
using Mpt.Domain.Shared;
using Mpt.Domain.Users;

namespace Mpt.Domain.Tasks
{
    public class SurveillanceTask : Task
    {

        public PhoneNumber PhoneNumber { get; private set; }
        public string FloorId { get; set; }


        // Constructors
        public SurveillanceTask() : base()
        {
        }

        public SurveillanceTask(UserId userId, string taskType,
            List<string> path, List<List<RobotMovement>> robotMovements,
            PhoneNumber phoneNumber, string floorId, ApprovalStatus isApproved)

            : base(userId, taskType, path, robotMovements, isApproved)
        {
            this.PhoneNumber = phoneNumber;
            this.FloorId = floorId;

        }

        public void ChangePhoneNumber(PhoneNumber phoneNumber)
        {
            if (base.IsApproved == ApprovalStatus.rejected)
                throw new BusinessRuleValidationException("It is not possible to change the phone number of an unapproved task.");

            if (base.IsCompleted)
                throw new BusinessRuleValidationException("It is not possible to change the phone number of a completed task.");

            this.PhoneNumber = phoneNumber;
        }

    }
}