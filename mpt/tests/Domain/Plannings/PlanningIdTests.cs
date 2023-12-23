using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Plannings;

namespace tests.Domain.Plannings
{
    [TestClass]
    public class PlanningIdTests
    {
        [TestMethod]
        public void PlanningId_Constructor_WithGuid_ShouldSetBaseValue()
        {
            // Arrange
            Guid value = Guid.NewGuid();

            // Act
            PlanningId planningId = new PlanningId(value);

            // Assert
            Assert.AreEqual(value, planningId.AsGuid());
        }

        [TestMethod]
        public void PlanningId_Constructor_WithString_ShouldSetBaseValue()
        {
            // Arrange
            string value = new Guid().ToString();

            // Act
            PlanningId planningId = new PlanningId(value);

            // Assert
            Assert.AreEqual(value, planningId.AsString());
        }
    }
}
