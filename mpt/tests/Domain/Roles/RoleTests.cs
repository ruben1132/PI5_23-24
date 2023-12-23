using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Roles;
using Mpt.Core.Domain;

namespace tests.Domain.Roles
{
    [TestClass]
    public class RoleTests
    {
        [TestMethod]
        public void Role_Constructor_ValidName_ShouldCreateRole()
        {
            // Arrange
            string name = "Test Role";

            // Act
            Role role = new Role(name);

            // Assert
            Assert.IsNotNull(role);
            Assert.AreEqual(name, role.Name);
            Assert.IsTrue(role.Active);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void Role_Constructor_NullName_ShouldThrowException()
        {
            // Arrange
            string name = null;

            // Act
            Role role = new Role(name);

            // Assert
            // Exception is expected
        }

        [TestMethod]
        public void Role_ChangeName_ValidDescription_ShouldChangeName()
        {
            // Arrange
            Role role = new Role("Test Role");
            string newDescription = "New Role";

            // Act
            role.ChangeName(newDescription);

            // Assert
            Assert.AreEqual(newDescription, role.Name);
        }

        [TestMethod]
        [ExpectedException(typeof(BusinessRuleValidationException))]
        public void Role_ChangeName_InactiveRole_ShouldThrowException()
        {
            // Arrange
            Role role = new Role("Test Role");
            role.Disable();
            string newDescription = "New Role";

            // Act
            role.ChangeName(newDescription);

            // Assert
            // Exception is expected
        }

        [TestMethod]
        public void Role_Enable_ShouldSetActive()
        {
            // Arrange
            Role role = new Role("Test Role");
            role.Disable();

            // Act
            role.Enable();

            // Assert
            Assert.IsTrue(role.Active);
        }

        [TestMethod]
        public void Role_Disable_ShouldSetInactive()
        {
            // Arrange
            Role role = new Role("Test Role");

            // Act
            role.Disable();

            // Assert
            Assert.IsFalse(role.Active);
        }
    }
}
