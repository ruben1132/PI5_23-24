using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Users;
using Mpt.Core.Domain;

namespace tests.Domain.Users
{
    [TestClass]
    public class UserEmailTests
    {
        [TestMethod]
        public void UserEmail_WithValidEmail_ShouldNotThrowException()
        {
            // Arrange
            string validEmail = "test@isep.ipp.pt";

            // Act
            UserEmail userEmail = new UserEmail(validEmail);

            // Assert
            Assert.AreEqual(validEmail, userEmail.Value);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void UserEmail_WithInvalidEmail_ShouldThrowException()
        {
            // Arrange
            string invalidEmail = "invalidemail";

            // Act
            UserEmail userEmail = new UserEmail(invalidEmail);

            // Assert
            // Exception is expected to be thrown
        }
    }
}
