using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;
using Mpt.Domain.Tasks;

namespace tests.Domain.Tasks.Tests
{
    [TestClass]
    public class TaskTypeTests
    {
        [TestMethod]
        public void TaskType_InvalidValue_ThrowsBusinessRuleValidationException()
        {
            // Arrange
            string invalidValue = "InvalidTaskType";

            // Act & Assert
            Assert.ThrowsException<BusinessRuleValidationException>(() => new TaskType(invalidValue));
        }

        [TestMethod]
        public void TaskType_ValidValue_CreatesInstance()
        {
            // Arrange
            string validValue = "Surveillance";

            // Act
            var taskType = new TaskType(validValue);

            // Assert
            Assert.AreEqual(validValue, taskType.Value);
        }
    }
}
