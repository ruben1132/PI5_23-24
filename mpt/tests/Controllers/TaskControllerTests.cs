using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using Mpt.Controllers;
using Mpt.Core.Logic;

namespace tests.Controllers.Tests
{
    [TestClass]
    public class TasksControllerTests
    {
        private Mock<ITaskService> _serviceMock;
        private TasksController _controller;

        [TestInitialize]
        public void Initialize()
        {
            _serviceMock = new Mock<ITaskService>();
            _controller = new TasksController(_serviceMock.Object);
        }

        //[TestMethod]
        //public async Task CreateSurveillanceTaskAsync_Should_Return_OkResult_When_Task_Created_Successfully()
        //{
        //    // Arrange
        //    var task = new CreateSurveillanceTaskDto(new Guid().ToString(), "915362478");
        //    var userWithRoleDto = new UserWithRoleDto("userId", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
        //    var token = "sampleToken";
        //    var createdTask = new TaskDto();

        //    _serviceMock.Setup(x => x.AddSurveillanceTaskAsync(task, currentUser.Id, token))
        //        .ReturnsAsync(Result.Success(createdTask));

        //    // Act
        //    var result = await _controller.CreateSurveillanceTaskAsync(task);

        //    // Assert
        //    Assert.IsInstanceOfType(result, typeof(ActionResult<TaskDto>));
        //    Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
        //    Assert.AreEqual(createdTask, (result.Result as OkObjectResult).Value);
        //}

        //[TestMethod]
        //public async Task CreateSurveillanceTaskAsync_Should_Return_BadRequest_When_Task_Creation_Fails()
        //{
        //    // Arrange
        //    var task = new CreateSurveillanceTaskDto();
        //    var currentUser = new UserWithRoleDto { Id = Guid.NewGuid() };
        //    var token = "sampleToken";
        //    var error = "Error message";

        //    _serviceMock.Setup(x => x.AddSurveillanceTaskAsync(task, currentUser.Id, token))
        //        .ReturnsAsync(Result.Failure<TaskDto>(error));

        //    // Act
        //    var result = await _controller.CreateSurveillanceTaskAsync(task);

        //    // Assert
        //    Assert.IsInstanceOfType(result, typeof(ActionResult<TaskDto>));
        //    Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
        //    Assert.AreEqual(error, (result.Result as BadRequestObjectResult).Value);
        //}

        // Add more test methods for other controller actions

        // ...
    }
}
