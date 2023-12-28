using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;
using Mpt.Domain.Tasks;

namespace unit.Domain.Tasks
{
    [TestClass]
    public class RobotMovementTests
    {
        [TestMethod]
        public void Equals_SameCoordinates_ReturnsTrue()
        {
            // Arrange
            RobotMovement movement1 = new RobotMovement(0, 0);
            RobotMovement movement2 = new RobotMovement(0, 0);

            // Act
            bool result = movement1.Equals(movement2);

            // Assert
            Assert.IsTrue(result);
        }

        [TestMethod]
        public void Equals_DifferentCoordinates_ReturnsFalse()
        {
            // Arrange
            RobotMovement movement1 = new RobotMovement(0, 0);
            RobotMovement movement2 = new RobotMovement(1, 1);

            // Act
            bool result = movement1.Equals(movement2);

            // Assert
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void GetHashCode_SameCoordinates_ReturnsSameHashCode()
        {
            // Arrange
            RobotMovement movement1 = new RobotMovement(0, 0);
            RobotMovement movement2 = new RobotMovement(0, 0);

            // Act
            int hashCode1 = movement1.GetHashCode();
            int hashCode2 = movement2.GetHashCode();

            // Assert
            Assert.AreEqual(hashCode1, hashCode2);
        }

        [TestMethod]
        public void GetHashCode_DifferentCoordinates_ReturnsDifferentHashCode()
        {
            // Arrange
            RobotMovement movement1 = new RobotMovement(0, 0);
            RobotMovement movement2 = new RobotMovement(1, 1);

            // Act
            int hashCode1 = movement1.GetHashCode();
            int hashCode2 = movement2.GetHashCode();

            // Assert
            Assert.AreNotEqual(hashCode1, hashCode2);
        }
    }
}
