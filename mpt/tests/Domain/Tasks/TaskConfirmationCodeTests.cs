using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;
using Mpt.Domain.Tasks;


namespace tests.Domain.Tasks.Tests
{
    [TestClass]
    public class TaskConfirmationCodeTests
    {
        [TestMethod]
        public void TaskConfirmationCode_WithValidValue_ShouldNotThrowException()
        {
            // Arrange
            string validValue = "ABC123";

            // Act
            TaskConfirmationCode code = new TaskConfirmationCode(validValue);

            // Assert
            Assert.AreEqual(validValue, code.Value);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void TaskConfirmationCode_WithEmptyValue_ShouldThrowException()
        {
            // Arrange
            string emptyValue = "";

            // Act
            TaskConfirmationCode code = new TaskConfirmationCode(emptyValue);

            // Assert
            // Exception is expected
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void TaskConfirmationCode_WithInvalidCharacters_ShouldThrowException()
        {
            // Arrange
            string invalidValue = "ABC@123";

            // Act
            TaskConfirmationCode code = new TaskConfirmationCode(invalidValue);

            // Assert
            // Exception is expected
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void TaskConfirmationCode_WithInvalidLength_ShouldThrowException()
        {
            // Arrange
            string invalidValue = "ABC1234";

            // Act
            TaskConfirmationCode code = new TaskConfirmationCode(invalidValue);

            // Assert
            // Exception is expected
        }
    }
}
