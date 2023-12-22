using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;
using Mpt.Domain.Tasks;

namespace tests.Domain.Tasks.Tests
{
    [TestClass]
    public class TaskTests
    {
        [TestMethod]
        public void CompleteTask_ShouldSetIsCompletedToTrue_WhenIsApprovedIsNotRejected()
        {
            // Arrange
            var task = new Mpt.Domain.Tasks.Task();

            // Act
            task.CompleteTask();

            // Assert
            Assert.IsTrue(task.IsCompleted);
        }

        [TestMethod]
        public void UncompleteTask_ShouldSetIsCompletedToFalse()
        {
            // Arrange
            var task = new Mpt.Domain.Tasks.Task();

            // Act
            task.UncompleteTask();

            // Assert
            Assert.IsFalse(task.IsCompleted);
        }

        [TestMethod]
        public void AproveTask_ShouldSetIsApprovedToApproved()
        {
            // Arrange
            var task = new Mpt.Domain.Tasks.Task();

            // Act
            task.AproveTask();

            // Assert
            Assert.AreEqual(ApprovalStatus.approved, task.IsApproved);
        }

        [TestMethod]
        public void DisaproveTask_ShouldSetIsApprovedToRejected()
        {
            // Arrange
            var task = new Mpt.Domain.Tasks.Task();

            // Act
            task.DisaproveTask();

            // Assert
            Assert.AreEqual(ApprovalStatus.rejected, task.IsApproved);
        }
    }
}
