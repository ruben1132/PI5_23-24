using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Users;
using Mpt.Core.Domain;

namespace unit.Domain.Users
{
    [TestClass]
    public class UserIdTests
    {
        [TestMethod]
        public void UserId_Constructor_WithGuid_ShouldSetGuidValue()
        {
            // Arrange
            Guid guid = Guid.NewGuid();

            // Act
            UserId userId = new UserId(guid);

            // Assert
            Assert.AreEqual(guid, userId.AsGuid());
        }

        [TestMethod]
        public void UserId_Constructor_WithString_ShouldSetGuidValue()
        {
            // Arrange
            string guidString = Guid.NewGuid().ToString();

            // Act
            UserId userId = new UserId(guidString);

            // Assert
            Assert.AreEqual(guidString, userId.AsString());
        }

        [TestMethod]
        public void UserId_CreateFromString_ShouldReturnGuid()
        {
            // Arrange
            string guidString = Guid.NewGuid().ToString();
            UserId userId = new UserId(guidString);


            // Assert
            Assert.AreEqual(guidString, userId.AsString());
        }

        [TestMethod]
        public void UserId_AsString_ShouldReturnGuidAsString()
        {
            // Arrange
            Guid guid = Guid.NewGuid();
            UserId userId = new UserId(guid);

            // Act
            string guidString = userId.AsString();

            // Assert
            Assert.AreEqual(guid.ToString(), guidString);
        }

        [TestMethod]
        public void UserId_AsGuid_ShouldReturnGuid()
        {
            // Arrange
            Guid guid = Guid.NewGuid();
            UserId userId = new UserId(guid);

            // Act
            Guid result = userId.AsGuid();

            // Assert
            Assert.AreEqual(guid, result);
        }
    }
}
