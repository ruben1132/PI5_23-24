using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;
using Mpt.Domain.Tasks;
using Mpt.Domain.Shared;

namespace unit.Domain.Tasks
{
    [TestClass]
    public class SurveillanceTaskTests
    {
        [TestMethod]
        public void ChangePhoneNumber_ValidPhoneNumber_PhoneNumberChanged()
        {
            // Arrange
            var task = new SurveillanceTask();
            var phoneNumber = new PhoneNumber("916234789");

            // Act
            task.ChangePhoneNumber(phoneNumber);

            // Assert
            Assert.AreEqual(phoneNumber, task.PhoneNumber);
        }
    }
}
