using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Users;
using Mpt.Core.Domain;


namespace tests.Domain.Users
{
    [TestClass]
    public class UserPasswordTests
    {
        [TestMethod]
        public void UserPassword_Value_SetCorrectly()
        {
            // Arrange
            string value = "password";

            // Act
            UserPassword userPassword = new UserPassword(value);

            // Assert
            Assert.AreEqual(value, userPassword.Value);
        }

        [TestMethod]
        public void UserPassword_RestrictedValue_SetCorrectly()
        {
            // Arrange
            string value = "Pa$$w0rd!!";
            bool isRestricted = true;

            // Act
            UserPassword userPassword = new UserPassword(value, isRestricted);

            // Assert
            Assert.AreEqual(value, userPassword.Value);
        }

        [TestMethod]
        public void UserPassword_RestrictedValue_ThrowsException_WhenEmpty()
        {
            // Arrange
            string value = "";
            bool isRestricted = true;

            // Act & Assert
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserPassword(value, isRestricted));
        }

        [TestMethod]
        public void UserPassword_RestrictedValue_ThrowsException_WhenTooShort()
        {
            // Arrange
            string value = "short";
            bool isRestricted = true;

            // Act & Assert
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserPassword(value, isRestricted));
        }

        [TestMethod]
        public void UserPassword_RestrictedValue_ThrowsException_WhenNoUppercase()
        {
            // Arrange
            string value = "password";
            bool isRestricted = true;

            // Act & Assert
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserPassword(value, isRestricted));
        }

        [TestMethod]
        public void UserPassword_RestrictedValue_ThrowsException_WhenNoLowercase()
        {
            // Arrange
            string value = "PASSWORD";
            bool isRestricted = true;

            // Act & Assert
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserPassword(value, isRestricted));
        }

        [TestMethod]
        public void UserPassword_RestrictedValue_ThrowsException_WhenNoDigit()
        {
            // Arrange
            string value = "Password";
            bool isRestricted = true;

            // Act & Assert
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserPassword(value, isRestricted));
        }

        [TestMethod]
        public void UserPassword_RestrictedValue_ThrowsException_WhenNoSymbol()
        {
            // Arrange
            string value = "Password123";
            bool isRestricted = true;

            // Act & Assert
            Assert.ThrowsException<BusinessRuleValidationException>(() => new UserPassword(value, isRestricted));
        }
    }
}
