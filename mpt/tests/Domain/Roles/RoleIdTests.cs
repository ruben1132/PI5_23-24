using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Roles;

namespace tests.Domain.Roles
{
    [TestClass]
    public class RoleIdTests
    {
        [TestMethod]
        public void RoleId_Constructor_StringValue_ShouldSetBaseValue()
        {
            // Arrange
            string value = new Guid().ToString();

            // Act
            RoleId roleId = new RoleId(value);

            // Assert
            Assert.AreEqual(value, roleId.AsString());
        }
    }
}
