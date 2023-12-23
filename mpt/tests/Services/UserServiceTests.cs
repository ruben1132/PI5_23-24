using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

using Mpt.Services;
using Mpt.IRepositories;
using Mpt.Core.Domain;

namespace Services.Tests : IUserService
{
    [TestClass]
    public class UserServiceTests
    {
        private Mock<IConfiguration> _configMock;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IUserRepository> _repoMock;
        private Mock<IRoleRepository> _roleRepoMock;
        private Mock<ITaskRepository> _taskRepoMock;
        private string _emailDomain;

        [TestInitialize]
        public void Setup()
        {
            _configMock = new Mock<IConfiguration>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _repoMock = new Mock<IUserRepository>();
            _roleRepoMock = new Mock<IRoleRepository>();
            _taskRepoMock = new Mock<ITaskRepository>();
            _emailDomain = "example.com";
        }

        [TestMethod]
        public async Task GetAllAsync_ShouldReturnOkResult()
        {
            // Arrange
            var userService = new UserService(_configMock.Object, _unitOfWorkMock.Object, _repoMock.Object, _roleRepoMock.Object, _taskRepoMock.Object, _emailDomain);

            // Act
            var result = await userService.GetAllAsync(null, null);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(List<UserWithRoleDto>));
        }

        [TestMethod]
        public async Task GetAllAsync_ShouldReturnFailResult()
        {
            // Arrange
            var userService = new UserService(_configMock.Object, _unitOfWorkMock.Object, _repoMock.Object, _roleRepoMock.Object, _taskRepoMock.Object, _emailDomain);

            // Act
            var result = await userService.GetAllAsync(null, "error");

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
        }

        [TestMethod]
        public async Task GetUserAllInfo_ShouldReturnOkResult()
        {
            // Arrange
            var userService = new UserService(_configMock.Object, _unitOfWorkMock.Object, _repoMock.Object, _roleRepoMock.Object, _taskRepoMock.Object, _emailDomain);
            var id = Guid.NewGuid();
            var token = "token";

            // Act
            var result = await userService.GetUserAllInfo(id, token);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(UserWithTasks));
        }

        [TestMethod]
        public async Task GetUserAllInfo_ShouldReturnFailResult()
        {
            // Arrange
            var userService = new UserService(_configMock.Object, _unitOfWorkMock.Object, _repoMock.Object, _roleRepoMock.Object, _taskRepoMock.Object, _emailDomain);
            var id = Guid.NewGuid();
            var token = "error";

            // Act
            var result = await userService.GetUserAllInfo(id, token);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
        }

        // Add tests for other methods...

        private UserService CreateUserService()
        {
            return new UserService(_configMock.Object, _unitOfWorkMock.Object, _repoMock.Object, _roleRepoMock.Object, _taskRepoMock.Object, _emailDomain);
        }
    }
}
