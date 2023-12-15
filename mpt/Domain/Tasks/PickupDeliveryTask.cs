using Mpt.Core.Domain;
using Mpt.Domain.Shared;
using Mpt.Domain.Users;
using System.Collections.Generic;

namespace Mpt.Domain.Tasks
{
    public class PickupDeliveryTask : Task
    {

        public string PickupPersonName { get; private set; }
        public PhoneNumber PickupPersonPhoneNumber { get; private set; }
        public string DeliveryPersonName { get; private set; }
        public PhoneNumber DeliveryPersonPhoneNumber { get; private set; }
        public string TaskDescription { get; private set; }
        public TaskConfirmationCode ConfirmationCode { get; private set; }
        public string OriginType { get; set; }
        public string Origin { get; set; }
        public string DestinyType { get; set; }
        public string Destiny { get; set; }

        // ef
        public PickupDeliveryTask() : base()
        {
        }

        // Constructors
        public PickupDeliveryTask(UserId userId, string taskType, List<string> path, List<List<RobotMovement>> robotMovements,
            string originType, string origin, string destinyType, string destiny, string taskDescription, string pickupPersonName,
            PhoneNumber pickupPersonPhoneNumber, string deliveryPersonName, PhoneNumber deliveryPersonPhoneNumber,
            TaskConfirmationCode taskConfirmationCode, bool? isApproved = null)
            : base(userId, taskType, path, robotMovements, isApproved)
        {
            this.TaskDescription = taskDescription;
            this.PickupPersonName = pickupPersonName;
            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
            this.DeliveryPersonName = deliveryPersonName;
            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
            this.ConfirmationCode = taskConfirmationCode;
            this.OriginType = originType;
            this.Origin = origin;
            this.DestinyType = destinyType;
            this.Destiny = destiny;
        }

        public void ChangeTaskDescription(string taskDescription)
        {
            if (base.IsApproved == false)
                throw new BusinessRuleValidationException("It is not possible to change the task description of an unapproved task.");

            if (base.IsCompleted)
                throw new BusinessRuleValidationException("It is not possible to change the task description of a completed task.");

            this.TaskDescription = taskDescription;
        }

        public void ChangePickupPersonName(string pickupPersonName)
        {
            if (base.IsApproved == false)
                throw new BusinessRuleValidationException("It is not possible to change the pickup person name of an unapproved task.");

            if (base.IsCompleted)
                throw new BusinessRuleValidationException("It is not possible to change the pickup person name of a completed task.");

            this.PickupPersonName = pickupPersonName;
        }

        public void ChangePickupPersonPhoneNumber(PhoneNumber pickupPersonPhoneNumber)
        {
            if (base.IsApproved == false)
                throw new BusinessRuleValidationException("It is not possible to change the pickup person phone number of an unapproved task.");

            if (base.IsCompleted)
                throw new BusinessRuleValidationException("It is not possible to change the pickup person phone number of a completed task.");

            this.PickupPersonPhoneNumber = pickupPersonPhoneNumber;
        }

        public void ChangeDeliveryPersonName(string deliveryPersonName)
        {
            if (base.IsApproved == false)
                throw new BusinessRuleValidationException("It is not possible to change the delivery person name of an unapproved task.");

            if (base.IsCompleted)
                throw new BusinessRuleValidationException("It is not possible to change the delivery person name of a completed task.");

            this.DeliveryPersonName = deliveryPersonName;
        }

        public void ChangeDeliveryPersonPhoneNumber(PhoneNumber deliveryPersonPhoneNumber)
        {
            if (base.IsApproved == false)
                throw new BusinessRuleValidationException("It is not possible to change the delivery person phone number of an unapproved task.");

            if (base.IsCompleted)
                throw new BusinessRuleValidationException("It is not possible to change the delivery person phone number of a completed task.");

            this.DeliveryPersonPhoneNumber = deliveryPersonPhoneNumber;
        }





    }
}