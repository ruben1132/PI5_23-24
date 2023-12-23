using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Users;
using Mpt.Core.Domain;

namespace tests.Domain.Users
{
    [TestClass]
    public class UserNifTests
    {
        [TestMethod]
        public void UserNif_ValidNif_ShouldNotThrowException()
        {
            // Arrange
            string validNif = "123456789";

            // Act
            UserNif userNif = new UserNif(validNif);

            // Assert
            Assert.AreEqual(validNif, userNif.Value);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void UserNif_InvalidNif_ShouldThrowException()
        {
            // Arrange
            string invalidNif = "12345678";

            // Act
            UserNif userNif = new UserNif(invalidNif);

            // Assert
            // Exception is expected to be thrown
        }
    }
}
