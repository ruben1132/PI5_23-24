using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;
using Mpt.Domain.Tasks;
using Mpt.Domain.Shared;

namespace unit.Domain.Tasks
{
    [TestClass]
    public class PickupDeliveryTaskTests
    {
        [TestMethod]
        public void ChangeTaskDescription_ValidDescription_TaskDescriptionChanged()
        {
            // Arrange
            var task = new PickupDeliveryTask();
            var newDescription = "New task description";

            // Act
            task.ChangeTaskDescription(newDescription);

            // Assert
            Assert.AreEqual(newDescription, task.TaskDescription);
        }

        [TestMethod]
        public void ChangePickupPersonName_ValidName_PickupPersonNameChanged()
        {
            // Arrange
            var task = new PickupDeliveryTask();
            var newName = "New pickup person name";

            // Act
            task.ChangePickupPersonName(newName);

            // Assert
            Assert.AreEqual(newName, task.PickupPersonName);
        }

        [TestMethod]
        public void ChangePickupPersonPhoneNumber_ValidPhoneNumber_PickupPersonPhoneNumberChanged()
        {
            // Arrange
            var task = new PickupDeliveryTask();
            var newPhoneNumber = new PhoneNumber("987654321");

            // Act
            task.ChangePickupPersonPhoneNumber(newPhoneNumber);

            // Assert
            Assert.AreEqual(newPhoneNumber, task.PickupPersonPhoneNumber);
        }

        [TestMethod]
        public void ChangeDeliveryPersonName_ValidName_DeliveryPersonNameChanged()
        {
            // Arrange
            var task = new PickupDeliveryTask();
            var newName = "New delivery person name";

            // Act
            task.ChangeDeliveryPersonName(newName);

            // Assert
            Assert.AreEqual(newName, task.DeliveryPersonName);
        }

        [TestMethod]
        public void ChangeDeliveryPersonPhoneNumber_ValidPhoneNumber_DeliveryPersonPhoneNumberChanged()
        {
            // Arrange
            var task = new PickupDeliveryTask();
            var newPhoneNumber = new PhoneNumber("987654321");

            // Act
            task.ChangeDeliveryPersonPhoneNumber(newPhoneNumber);

            // Assert
            Assert.AreEqual(newPhoneNumber, task.DeliveryPersonPhoneNumber);
        }
    }
}
