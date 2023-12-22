using Microsoft.VisualStudio.TestTools.UnitTesting;

using Mpt.Domain.Users;
using Mpt.Core.Domain;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;


namespace tests.Domain.Users.Tests
{
    [TestClass]
    public class UserTests
    {
        [TestMethod]
        public void ChangePassword_Should_UpdatePassword()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );
            var newPassword = new UserPassword("newpassword");

            // Act
            user.ChangePassword(newPassword);

            // Assert
            Assert.AreEqual(newPassword, user.Password);
        }

        [TestMethod]
        public void ChangeEmail_Should_UpdateEmail()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );
            var newEmail = new UserEmail("newemail@isep.ipp.pt");

            // Act
            user.ChangeEmail(newEmail);

            // Assert
            Assert.AreEqual(newEmail, user.Email);
        }

        [TestMethod]
        public void ChangeName_Should_UpdateName()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );
            var newName = "Jane Doe";

            // Act
            user.ChangeName(newName);

            // Assert
            Assert.AreEqual(newName, user.Name);
        }

        [TestMethod]
        public void ChangePhone_Should_UpdatePhone()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );
            var newPhone = new PhoneNumber("987654321");

            // Act
            user.ChangePhone(newPhone);

            // Assert
            Assert.AreEqual(newPhone, user.Phone);
        }

        [TestMethod]
        public void ChangeNif_Should_UpdateNif()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );
            var newNif = new UserNif("987654321");

            // Act
            user.ChangeNif(newNif);

            // Assert
            Assert.AreEqual(newNif, user.Nif);
        }

        [TestMethod]
        public void Enable_Should_SetActiveToTrue()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );

            // Act
            user.Enable();

            // Assert
            Assert.IsTrue(user.Active);
        }

        [TestMethod]
        public void Disable_Should_SetActiveToFalse()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );

            // Act
            user.Disable();

            // Assert
            Assert.IsFalse(user.Active);
        }

        [TestMethod]
        public void ChangeRole_Should_UpdateRoleId()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );
            var newRoleId = new RoleId(new Guid().ToString());

            // Act
            user.ChangeRole(newRoleId);

            // Assert
            Assert.AreEqual(newRoleId, user.RoleId);
        }

        [TestMethod]
        public void Approve_Should_SetIsApprovedToApproved()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );

            // Act
            user.Approve();

            // Assert
            Assert.AreEqual(ApprovalStatus.approved, user.IsApproved);
        }

        [TestMethod]
        public void Disapprove_Should_SetIsApprovedToRejected()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );

            // Act
            user.Disapprove();

            // Assert
            Assert.AreEqual(ApprovalStatus.rejected, user.IsApproved);
        }

        [TestMethod]
        public void UpdateLastUpdated_Should_UpdateLastUpdated()
        {
            // Arrange
            var user = new User(
                new UserEmail("test@isep.ipp.pt"),
                "John Doe",
                new PhoneNumber("915698789"),
                new UserNif("123456789"),
                new RoleId(new Guid().ToString()),
                new UserPassword("Pa$$w0rd!!"),
                ApprovalStatus.pending
            );
            var originalLastUpdated = user.LastUpdated;

            // Act
            user.UpdateLastUpdated();

            // Assert
            Assert.AreNotEqual(originalLastUpdated, user.LastUpdated);
        }
    }
}
