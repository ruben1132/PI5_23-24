using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Core.Domain;
using Mpt.Domain.Roles;
using Mpt.Domain.Tasks;

namespace unit.Domain.Tasks
{
    [TestClass]
    public class TaskIdTests
    {
        [TestMethod]
        public void CreateFromString_ValidText_ReturnsGuid()
        {
            // Arrange
            string value = new Guid().ToString();
            TaskId taskId = new TaskId(value);


            // Assert
            Assert.AreEqual(value, taskId.AsString());
        }
    }
}
