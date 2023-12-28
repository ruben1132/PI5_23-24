using Microsoft.VisualStudio.TestTools.UnitTesting;


using Mpt.Domain.Plannings;
using Mpt.Domain.Users;

namespace unit.Domain.Plannings
{
    [TestClass]
    public class PlanningTests
    {
        [TestMethod]
        public void TestConstructor()
        {
            // Arrange
            int cost = 100;
            UserId userId = new UserId(Guid.NewGuid());

            // Act
            Planning planning = new Planning(cost, userId);

            // Assert
            Assert.AreEqual(cost, planning.Cost);
            Assert.AreEqual(userId, planning.UserId);
        }
        
    }
}
