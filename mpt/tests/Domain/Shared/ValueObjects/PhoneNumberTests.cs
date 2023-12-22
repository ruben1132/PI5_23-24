using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;

namespace Mpt.Domain.Shared.Tests
{
    [TestClass]
    public class PhoneNumberTests
    {
        [TestMethod]
        public void PhoneNumber_WithValidNumber_ShouldNotThrowException()
        {
            // Arrange
            string validNumber = "912345678";

            // Act
            PhoneNumber phoneNumber = new PhoneNumber(validNumber);

            // Assert
            Assert.AreEqual(validNumber, phoneNumber.Value);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void PhoneNumber_WithInvalidNumber_ShouldThrowException()
        {
            // Arrange
            string invalidNumber = "123456789";

            // Act
            PhoneNumber phoneNumber = new PhoneNumber(invalidNumber);

            // Assert
            // Exception is expected to be thrown
        }

        [TestMethod]
        public void PhoneNumber_WithVerifiedFalse_ShouldNotValidateNumber()
        {
            // Arrange
            string number = "912345678";
            bool isVerified = false;

            // Act
            PhoneNumber phoneNumber = new PhoneNumber(number, isVerified);

            // Assert
            Assert.AreEqual(number, phoneNumber.Value);
        }
    }
}
