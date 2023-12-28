using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

using Mpt.Services;
using Mpt.IRepositories;
using Mpt.Core.Domain;
using Microsoft.Extensions.Configuration;

using Mpt.Dtos;
using Mpt.Domain.Users;
using Mpt.Domain.Roles;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace unit.Services
{
    [TestClass]
    public class RoleServiceTests
    {
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IRoleRepository> _roleRepoMock;
        private RoleService _roleService;

        private List<Role> rolesList;


        [TestInitialize]
        public void Setup()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _roleRepoMock = new Mock<IRoleRepository>();


            //mocking role repo
            rolesList = new List<Role> { new Role("utente"), new Role("Admin"), new Role("Inactive") };
            rolesList[2].Disable();
            _roleRepoMock.Setup(repo => repo.GetAllFilteredAsync(true)).ReturnsAsync(rolesList);
            _roleRepoMock.Setup(repo => repo.GetByIdAsync(rolesList[0].Id)).ReturnsAsync(rolesList[0]);
            _roleRepoMock.Setup(repo => repo.GetByIdAsync(rolesList[1].Id)).ReturnsAsync(rolesList[1]);
            _roleRepoMock.Setup(repo => repo.GetByIdAsync(rolesList[2].Id)).ReturnsAsync(rolesList[2]);
            _roleRepoMock.Setup(repo => repo.GetByNameAsync(rolesList[0].Name)).ReturnsAsync(rolesList[0]);
            _roleRepoMock.Setup(repo => repo.GetByNameAsync(rolesList[1].Name)).ReturnsAsync(rolesList[1]);
            _roleRepoMock.Setup(repo => repo.GetByNameAsync(rolesList[2].Name)).ReturnsAsync(rolesList[2]);


            _roleService = new RoleService(_unitOfWorkMock.Object, _roleRepoMock.Object);
        }

        [TestMethod]
        public async Task GetAllAsync_Should_Return_All_Roles()
        {
            // Arrange
            var roles = new List<Role>();

            // Act
            var result = await _roleService.GetAllAsync(true);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(3, result.Value.Count);
        }

        [TestMethod]
        public async Task GetAllAsync_Should_Return_Empty_List_When_Roles_Null()
        {
            // Arrange
            List<Role> roles = null;

            // Act
            var result = await _roleService.GetAllAsync(null);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(0, result.Value.Count);
        }

        [TestMethod]
        public async Task GetByIdAsync_Should_Return_Role_When_Found()
        {
            // Arrange
            var id = new Guid(rolesList[0].Id.Value);

            var roleDto = new RoleDto(rolesList[0].Id.Value, rolesList[0].Name, rolesList[0].Active);

            // Act
            var result = await _roleService.GetByIdAsync(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(roleDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async Task GetByIdAsync_Should_Return_Fail_When_Role_Not_Found()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Role not found.";

            // Act
            var result = await _roleService.GetByIdAsync(id);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task AddAsync_Should_Add_Role()
        {
            // Arrange
            var dto = new CreateRoleDto("TESTROLE");

            // Act
            var result = await _roleService.AddAsync(dto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(dto.Name, result.Value.Name);
        }

        [TestMethod]
        public async Task UpdateAsync_Should_Update_Role()
        {
            // Arrange
            var dto = new RoleDto(rolesList[0].Id.Value, rolesList[0].Name, rolesList[0].Active);

            // Act
            var result = await _roleService.UpdateAsync(dto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsTrue(result.IsSuccess);
            Assert.AreEqual(dto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async Task UpdateAsync_Should_Return_Fail_When_Role_Not_Found()
        {
            // Arrange
            var dto = new RoleDto("00000000-0000-0000-0000-000000000000", rolesList[0].Name, rolesList[0].Active);
            var error = "Role not found.";

            // Act
            var result = await _roleService.UpdateAsync(dto);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task DeleteAsync_Should_Delete_Role()
        {
            // Arrange
            var id = new Guid(rolesList[2].Id.Value);

            // Act
            var result = await _roleService.DeleteAsync(id);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(id.ToString(), result.Value.Id);
        }

        [TestMethod]
        public async Task DeleteAsync_Should_Return_Fail_When_Role_Not_Found()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Role not found.";

            // Act
            var result = await _roleService.DeleteAsync(id);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task DeleteAsync_Should_Return_Fail_When_Role_Active()
        {
            // Arrange
            var id = new Guid(rolesList[0].Id.Value);
            var error = "You cannot delete a Role that is active.";

            // Act
            var result = await _roleService.DeleteAsync(id);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }
    }
}
