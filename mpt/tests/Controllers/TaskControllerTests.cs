using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Mpt.IServices;
using Mpt.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


using Mpt.Controllers;
using Mpt.Core.Logic;
using Microsoft.AspNetCore.Http;
using Mpt.Domain.Tasks;
using Sprache;
using Newtonsoft.Json.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace tests.Controllers
{
    [TestClass]
    public class TasksControllerTests
    {
        private Mock<ITaskService> _serviceMock;
        private TasksController _controller;

        [TestInitialize]
        public void Setup()
        {
            _serviceMock = new Mock<ITaskService>();
            _controller = new TasksController(_serviceMock.Object);

            // Arrange
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            // Set HttpContext user item
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _controller.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the user in HttpContext.Items


            // Set authorization header for testing purposes
            _controller.Request.Headers["Authorization"] = "Bearer token"; // Replace with your test token
        }

        [TestMethod]
        public async System.Threading.Tasks.Task CreateSurveillanceTaskAsync_Should_Return_OkResult_When_Task_Created_Successfully()
        {
            // Arrange
            var task = new CreateSurveillanceTaskDto("00000000-0000-0000-0000-000000000000", "915362478");
            var user = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            var token = "token";
            var SurveillanceTaskSimpleDto = new SurveillanceTaskSimpleDto(false, null, null, null, null, null);

            _serviceMock.Setup(x => x.AddSurveillanceTaskAsync(task, user.Id, token)).ReturnsAsync(Result<SurveillanceTaskSimpleDto>.Ok(SurveillanceTaskSimpleDto));

            // Act
            var result = await _controller.CreateSurveillanceTaskAsync(task);

            // Assert
            Assert.IsInstanceOfType(result, typeof(ActionResult<TaskDto>));
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(SurveillanceTaskSimpleDto, (result.Result as OkObjectResult).Value);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task CreateSurveillanceTaskAsync_Should_Return_BadRequest_When_Not_Authenticated()
        {

            _controller.ControllerContext.HttpContext.Items["user"] = null; // Set the user in HttpContext.Items

            // Act
            var task = new CreateSurveillanceTaskDto("00000000-0000-0000-0000-000000000000", "915362478");

            var result = await _controller.CreateSurveillanceTaskAsync(task);

            var error = "Not authenticated";

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task CreateSurveillanceTaskAsync_ReturnsBadRequestResult_WhenTaskServiceFails()
        {
            // Arrange
            var task = new CreateSurveillanceTaskDto("00000000-0000-0000-0000-000000000000", "915362478");
            var token = "token";
            var error = "Failed to create surveillance task";

            _serviceMock.Setup(x => x.AddSurveillanceTaskAsync(task, "00000000-0000-0000-0000-000000000000", token)).ReturnsAsync(Result<SurveillanceTaskSimpleDto>.Fail(error));

            // Act
            var result = await _controller.CreateSurveillanceTaskAsync(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }
        
        [TestMethod]
        public async System.Threading.Tasks.Task CreatePickupDeliveryTaskAsync_Should_Return_Ok()
        {
            // Arrange
            var task = new CreatePickupDeliveryTaskDto(null, null, null, null, null, null, null, null, null, null, null);
            var user = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);


            var PickupDeliveryTaskSimpleDto = new PickupDeliveryTaskSimpleDto(false, null, null, null, null, null, null, null, null, null, null, null, null, null);

            _serviceMock.Setup(x => x.AddPickupDeliveryTaskAsync(task, user.Id)).ReturnsAsync(Result<PickupDeliveryTaskSimpleDto>.Ok(PickupDeliveryTaskSimpleDto));

            // Act
            var result = await _controller.CreatePickupDeliveryTaskAsync(task);

            // Assert
            Assert.IsInstanceOfType(result, typeof(ActionResult<TaskDto>));
            Assert.IsTrue(result.Result is OkObjectResult);
            Assert.AreEqual(PickupDeliveryTaskSimpleDto, (result.Result as OkObjectResult).Value);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task CreatePickupDeliveryTaskAsync_Should_Return_BadRequest_When_Not_Authenticated()
        {

            _controller.ControllerContext.HttpContext.Items["user"] = null; // Set the user in HttpContext.Items

            // Act
            var task = new CreatePickupDeliveryTaskDto(null, null, null, null, null, null, null, null, null, null, null);

            var result = await _controller.CreatePickupDeliveryTaskAsync(task);

            var error = "Not authenticated";

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task CreatePickupDeliveryTaskAsync_ReturnsBadRequestResult_WhenTaskServiceFails()
        {
            // Arrange
            var task = new CreatePickupDeliveryTaskDto(null, null, null, null, null, null, null, null, null, null, null);
            var error = "Failed to create surveillance task";

            _serviceMock.Setup(x => x.AddPickupDeliveryTaskAsync(task, "00000000-0000-0000-0000-000000000000")).ReturnsAsync(Result<PickupDeliveryTaskSimpleDto>.Fail(error));

            // Act
            var result = await _controller.CreatePickupDeliveryTaskAsync(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetAllTasksAsync_Should_Return_OkResult_With_All_Tasks()
        {
            // Arrange
            var tasks = new List<TaskDto>
            {
                new TaskDto("00000000-0000-0000-0000-000000000000", null, false, null, null, null, null),
                new TaskDto("00000000-0000-0000-0000-000000000001", null, false, null, null, null, null),
                new TaskDto("00000000-0000-0000-0000-000000000002", null, false, null, null, null, null),
            };

            var token = "token";

            _serviceMock.Setup(x => x.GetAllAsync(token, null, null, null)).ReturnsAsync(Result<List<TaskDto>>.Ok(tasks));

            // Act
            var result = await _controller.GetAll(null, null, null);

            // Assert
            Assert.IsInstanceOfType(result, typeof(ActionResult<List<TaskDto>>));
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(tasks, (result.Result as OkObjectResult).Value);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetAll_ReturnsBadRequestResult_WhenTaskServiceFails()
        {
            // Arrange

            var token = "token";
            var error = "Failed to get tasks";

            _serviceMock.Setup(x => x.GetAllAsync(token, null, null, null)).ReturnsAsync(Result<List<TaskDto>>.Fail(error));

            // Act
            var result = await _controller.GetAll(null, null, null);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetById_Should_Return_OkResult_With_Task()
        {
            // Arrange
            var taskId = "1";
            var task = new TaskDto("00000000-0000-0000-0000-000000000000", null, false, null, null, null, null);

            _serviceMock.Setup(x => x.GetByIdAsync(new Guid(task.Id))).ReturnsAsync(Result<TaskDto>.Ok(task));

            // Act
            var result = await _controller.GetById(new Guid(task.Id));

            // Assert
            Assert.IsInstanceOfType(result, typeof(ActionResult<TaskDto>));
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(task, (result.Result as OkObjectResult).Value);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetById_ReturnsBadRequestResult_WhenTaskServiceFails()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Failed to get task";

            _serviceMock.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(Result<TaskDto>.Fail(error));

            // Act
            var result = await _controller.GetById(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task DeleteTaskAsync_Should_Return_OkResult_When_Task_Deleted_Successfully()
        {
            // Arrange
            var taskId = "00000000-0000-0000-0000-000000000000";

            _serviceMock.Setup(x => x.DeleteAsync(new Guid(taskId))).ReturnsAsync(Result<string>.Ok("Deleted successfully."));

            // Act
            var result = await _controller.Delete(new Guid(taskId));

            // Assert
            Assert.IsInstanceOfType(result, typeof(ActionResult<string>));
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async System.Threading.Tasks.Task Delete_ReturnsBadRequestResult_WhenTaskServiceFails()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Failed to delete task";

            _serviceMock.Setup(x => x.DeleteAsync(id)).ReturnsAsync(Result<string>.Fail(error));

            // Act
            var result = await _controller.Delete(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }



        [TestMethod]
        public async System.Threading.Tasks.Task ApproveReject_ReturnsOk()
        {
            // Arrange
            Guid taskId = new Guid("00000000-0000-0000-0000-000000000000");
            IsApprovedDto isApproved = new IsApprovedDto("true");

            var updateTask = new TaskSimpleDto(false, null, null, null);
            _serviceMock.Setup(x => x.UpdateIsApprovedAsync(taskId, isApproved)).ReturnsAsync(Result<TaskSimpleDto>.Ok(updateTask));

            var updatedTask = new TaskSimpleDto(true, null, null, null);

            // Act
            var result = await _controller.ApproveReject(taskId, isApproved);

            // Assert
            Assert.IsInstanceOfType(result, typeof(ActionResult<TaskSimpleDto>));
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(updatedTask.ToString(), (result.Result as OkObjectResult).Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task ApproveReject_ReturnsBadRequestResult_WhenTaskServiceFails()
        {
            // Arrange
            Guid taskId = new Guid("00000000-0000-0000-0000-000000000000");
            IsApprovedDto isApproved = new IsApprovedDto("true");

            string error = "Failed to update task";
            _serviceMock.Setup(x => x.UpdateIsApprovedAsync(taskId, isApproved)).ReturnsAsync(Result<TaskSimpleDto>.Fail(error));

            // Act
            var result = await _controller.ApproveReject(taskId, isApproved);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetMyTasks_ReturnsOk()
        {
            // Arrange
            var user = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
            var tasks = new List<TaskSimpleDto>
            {
                new TaskSimpleDto(false, "1", null, null),
                new TaskSimpleDto(false, "2", null, null),
                new TaskSimpleDto(false, "3", null, null),
            };
            var token = "token";

            _serviceMock.Setup(x => x.GetMyTasksAsync(token, null, user.Id, null)).ReturnsAsync(Result<List<TaskSimpleDto>>.Ok(tasks));

            // Act
            var result = await _controller.GetMyTasks(null, null);

            // Assert
            // Assert
            Assert.IsInstanceOfType(result, typeof(ActionResult<List<TaskSimpleDto>>));
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            Assert.AreEqual(tasks, (result.Result as OkObjectResult).Value);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetMyTasks_Should_Return_BadRequest_When_Not_Authenticated()
        {

            _controller.ControllerContext.HttpContext.Items["user"] = null; // Set the user in HttpContext.Items

            var result = await _controller.GetMyTasks(null, null);

            var error = "Not authenticated";

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }


        [TestMethod]
        public async System.Threading.Tasks.Task GetMyTasks_ReturnsBadRequestResult_WhenTaskServiceFails()
        {
            // Arrange
            var user = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
            string error = "Failed to get tasks";
            var token = "token";

            _serviceMock.Setup(x => x.GetMyTasksAsync(token, null, user.Id, null)).ReturnsAsync(Result<List<TaskSimpleDto>>.Fail(error));

            // Act
            var result = await _controller.GetMyTasks(null, null);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }
    }
}
