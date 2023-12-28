using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Mpt.Controllers;
using Mpt.Core.Logic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace unit.Controllers
{
    [TestClass]
    public class PlanningsControllerTests
    {
        private Mock<IPlanningService> _mockService;
        private PlanningsController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockService = new Mock<IPlanningService>();
            _controller = new PlanningsController(_mockService.Object);

            // Arrange
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            // Set HttpContext user item
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _controller.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the user in HttpContext.Items


            // Set authorization header for testing purposes
            _controller.Request.Headers["Authorization"] = "Bearer token"; // Replace with your test token
        }

        [TestMethod]
        public async Task Create_ValidData_ReturnsOkResult()
        {
            // Arrange
            var tasks = new CreatePlanningDto(new List<string>());
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
            var createdPlanning = new PlanningFullDto("00000000-0000-0000-0000-000000000000", null, 0, null);

            _mockService.Setup(x => x.AddAsync(tasks, new Guid(currentUser.Id))).ReturnsAsync(Result<PlanningFullDto>.Ok(createdPlanning));

            // Act
            var result = await _controller.Create(tasks);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(createdPlanning, ((OkObjectResult)result.Result).Value);
        }

        [TestMethod]
        public async Task Create_InvalidData_ReturnsBadRequest()
        {
            // Arrange
            var tasks = new CreatePlanningDto(new List<string>());
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
            var error = "Invalid data";

            _mockService.Setup(x => x.AddAsync(tasks, new Guid(currentUser.Id))).ReturnsAsync(Result<PlanningFullDto>.Fail(error));

            // Act
            var result = await _controller.Create(tasks);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            Assert.AreEqual(new { error = error }.ToString(), ((BadRequestObjectResult)result.Result).Value.ToString());
        }

        [TestMethod]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var plannings = new List<PlanningFullDto>();

            _mockService.Setup(x => x.GetAllAsync()).ReturnsAsync(Result<List<PlanningFullDto>>.Ok(plannings));

            // Act
            var result = await _controller.GetAll();

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(plannings, ((OkObjectResult)result.Result).Value);
        }

        [TestMethod]
        public async Task GetAll_ReturnsBadRequest()
        {
            // Arrange
            var error = "Error retrieving plannings";

            _mockService.Setup(x => x.GetAllAsync()).ReturnsAsync(Result<List<PlanningFullDto>>.Fail(error));

            // Act
            var result = await _controller.GetAll();

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            Assert.AreEqual(new { error = error }.ToString(), ((BadRequestObjectResult)result.Result).Value.ToString());
        }

        [TestMethod]
        public async Task GetById_ValidId_ReturnsOkResult()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var planning = new PlanningFullDto("00000000-0000-0000-0000-000000000000", null, 0, null);

            _mockService.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(Result<PlanningFullDto>.Ok(planning));

            // Act
            var result = await _controller.GetById(id);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(planning, ((OkObjectResult)result.Result).Value);
        }

        [TestMethod]
        public async Task GetById_InvalidId_ReturnsBadRequest()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Invalid id";

            _mockService.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(Result<PlanningFullDto>.Fail(error));

            // Act
            var result = await _controller.GetById(id);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            Assert.AreEqual(new { error = error }.ToString(), ((BadRequestObjectResult)result.Result).Value.ToString());
        }

        [TestMethod]
        public async Task Delete_ValidId_ReturnsOkResult()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var deletedPlanning = "Planning deleted successfully";

            var PlanningSimpleDto = new PlanningSimpleDto("00000000-0000-0000-0000-000000000000", 0, null);

            _mockService.Setup(x => x.DeleteAsync(id)).ReturnsAsync(Result<PlanningSimpleDto>.Ok(PlanningSimpleDto));

            // Act
            var result = await _controller.Delete(id);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(new { message = deletedPlanning }.ToString(), ((OkObjectResult)result.Result).Value.ToString());
        }

        [TestMethod]
        public async Task Delete_InvalidId_ReturnsBadRequest()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Invalid id";

            var PlanningSimpleDto = new PlanningSimpleDto("00000000-0000-0000-0000-000000000000", 0, null);


            _mockService.Setup(x => x.DeleteAsync(id)).ReturnsAsync(Result<PlanningSimpleDto>.Fail(error));

            // Act
            var result = await _controller.Delete(id);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            Assert.AreEqual(new { error = error }.ToString(), ((BadRequestObjectResult)result.Result).Value.ToString());
        }
    }
}
