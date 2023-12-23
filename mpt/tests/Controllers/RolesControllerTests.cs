using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using Mpt.Controllers;
using Mpt.Core.Logic;
using Microsoft.AspNetCore.Mvc;

namespace tests.Controllers
{
    [TestClass]
    public class RolesControllerTests
    {
        private Mock<IRoleService> _mockService;
        private RolesController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockService = new Mock<IRoleService>();
            _controller = new RolesController(_mockService.Object);


            // Arrange
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            // Set HttpContext user item
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _controller.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the user in HttpContext.Items


            // Set authorization header for testing purposes
            _controller.Request.Headers["Authorization"] = "Bearer token"; // Replace with your test token
        }

        [TestMethod]
        public async Task Create_ValidRole_ReturnsOk()
        {
            // Arrange
            var role = new CreateRoleDto("Role");
            var createdRole = new RoleDto("00000000-0000-0000-0000-000000000000", "Role", true);

            _mockService.Setup(x => x.AddAsync(role)).ReturnsAsync(Result<RoleDto>.Ok(createdRole));

            // Act
            var result = await _controller.Create(role);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(createdRole, okResult.Value);
        }

        [TestMethod]
        public async Task Create_InvalidRole_ReturnsBadRequest()
        {
            // Arrange
            var role = new CreateRoleDto("Role");
            var error = "Invalid role";
            _mockService.Setup(x => x.AddAsync(role)).ReturnsAsync(Result<RoleDto>.Fail(error));

            // Act
            var result = await _controller.Create(role);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task Update_ValidRole_ReturnsOk()
        {
            // Arrange
            var role = new RoleDto("00000000-0000-0000-0000-000000000000", "Role", true);
            var updatedRole = new RoleDto("00000000-0000-0000-0000-000000000000", "Role", true);
            _mockService.Setup(x => x.UpdateAsync(role)).ReturnsAsync(Result<RoleDto>.Ok(updatedRole));

            // Act
            var result = await _controller.Update(role);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(updatedRole, okResult.Value);
        }

        [TestMethod]
        public async Task Update_InvalidRole_ReturnsBadRequest()
        {
            // Arrange
            var role = new RoleDto("00000000-0000-0000-0000-000000000000", "Role", true);
            var error = "Invalid role";
            _mockService.Setup(x => x.UpdateAsync(role)).ReturnsAsync(Result<RoleDto>.Fail(error));

            // Act
            var result = await _controller.Update(role);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task GetAll_ReturnsOk()
        {
            // Arrange
            var isSysRole = true;
            var roles = new List<RoleDto>();
            _mockService.Setup(x => x.GetAllAsync(isSysRole)).ReturnsAsync(Result<List<RoleDto>>.Ok(roles));

            // Act
            var result = await _controller.GetAll(isSysRole);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(roles, okResult.Value);
        }

        [TestMethod]
        public async Task GetAll_InvalidInput_ReturnsBadRequest()
        {
            // Arrange
            var isSysRole = true;
            var error = "Invalid input";
            _mockService.Setup(x => x.GetAllAsync(isSysRole)).ReturnsAsync(Result<List<RoleDto>>.Fail(error));

            // Act
            var result = await _controller.GetAll(isSysRole);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task GetById_ValidId_ReturnsOk()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var role = new RoleDto("00000000-0000-0000-0000-000000000000", "Role", true);
            _mockService.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(Result<RoleDto>.Ok(role));

            // Act
            var result = await _controller.GetById(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(role, okResult.Value);
        }

        [TestMethod]
        public async Task GetById_InvalidId_ReturnsBadRequest()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Invalid id";
            _mockService.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(Result<RoleDto>.Fail(error));

            // Act
            var result = await _controller.GetById(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task Delete_ValidId_ReturnsOk()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var deletedRole = "Role deleted successfully";

            var role = new RoleDto("00000000-0000-0000-0000-000000000000", "Role", true);

            _mockService.Setup(x => x.DeleteAsync(id)).ReturnsAsync(Result<RoleDto>.Ok(role));

            // Act
            var result = await _controller.Delete(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(new { message = "Role deleted successfully" }.ToString(), okResult.Value.ToString());
        }

        [TestMethod]
        public async Task Delete_InvalidId_ReturnsBadRequest()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Invalid id";
            _mockService.Setup(x => x.DeleteAsync(id)).ReturnsAsync(Result<RoleDto>.Fail(error));

            // Act
            var result = await _controller.Delete(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }
    }
}
