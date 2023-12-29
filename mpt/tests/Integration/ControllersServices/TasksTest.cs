using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

using Mpt.Services;
using Mpt.IRepositories;
using Mpt.Core.Domain;
using Microsoft.Extensions.Configuration;

using Mpt.Dtos;
using Mpt.Domain.Tasks;
using Mpt.Domain.Roles;
using Mpt.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mpt.Domain.Users;
using Mpt.Domain.Shared;

namespace tests.Integration
{
    [TestClass]
    public class TasksControllerServiceIntegrationTests
    {

        private TasksController _controller;
        private Mock<IConfiguration> _configMock;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<HttpClient> _httpClientMock;
        private Mock<IUserRepository> _userRepoMock;
        private Mock<IRoleRepository> _roleRepoMock;
        private Mock<ITaskRepository> _taskRepoMock;
        private TaskService _taskService;
        private string _emailDomain;
        private string _defaultRole;
        private List<Role> rolesList;
        private List<User> allUsers;
        private List<Mpt.Domain.Tasks.Task> tasksList;
        private List<FloorInfoDto> floorInfoList;


        private UserWithRoleDto currentUser;

        [TestInitialize]
        public void Setup()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _taskRepoMock = new Mock<ITaskRepository>();
            _roleRepoMock = new Mock<IRoleRepository>();
            _taskRepoMock = new Mock<ITaskRepository>();
            _userRepoMock = new Mock<IUserRepository>();
            _httpClientMock = new Mock<HttpClient>();
            _emailDomain = "isep.ipp.pt";
            _defaultRole = "utente";

            var floor1 = new FloorInfoDto("1");
            var floor2 = new FloorInfoDto("2");
            var floor3 = new FloorInfoDto("3");
            floorInfoList = new List<FloorInfoDto> { floor1, floor2, floor3 };


            //mocking role repo
            rolesList = new List<Role> { new Role("utente"), new Role("admin") };
            _roleRepoMock.Setup(repo => repo.GetAllFilteredAsync(true)).ReturnsAsync(rolesList);
            _roleRepoMock.Setup(repo => repo.GetByIdAsync(rolesList[0].Id)).ReturnsAsync(rolesList[0]);
            _roleRepoMock.Setup(repo => repo.GetByNameAsync(rolesList[0].Name)).ReturnsAsync(rolesList[0]);

            //mocking user repo 
            var user1 = new User(new UserEmail("user1@isep.ipp.pt"), "user1", new Mpt.Domain.Shared.PhoneNumber("987654321"), new UserNif("111222333"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user2 = new User(new UserEmail("user2@isep.ipp.pt"), "user2", new Mpt.Domain.Shared.PhoneNumber("912345678"), new UserNif("111444555"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user3 = new User(new UserEmail("user3@isep.ipp.pt"), "user3", new Mpt.Domain.Shared.PhoneNumber("956897413"), new UserNif("111666777"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user4 = new User(new UserEmail("user4@isep.ipp.pt"), "user4", new Mpt.Domain.Shared.PhoneNumber("968987456"), new UserNif("111888999"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.rejected);
            var user5 = new User(new UserEmail("user5@isep.ipp.pt"), "user5", new Mpt.Domain.Shared.PhoneNumber("912834291"), new UserNif("111888232"), rolesList[1].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user6 = new User(new UserEmail("user6@isep.ipp.pt"), "user6", new Mpt.Domain.Shared.PhoneNumber("937329102"), new UserNif("111482277"), rolesList[1].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            user4.Disable();

            // for current user
            var currentUserDomain = new User(new UserEmail("jane.doe@isep.ipp.pt"), "Jane Doe", new Mpt.Domain.Shared.PhoneNumber("912345678"), new UserNif("123456789"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.pending);
            currentUser = new UserWithRoleDto(currentUserDomain.Id.Value, "jane.doe@isep.ipp.pt", "Jane Doe", "912345678", "123456789", true, new RoleDto(rolesList[0].Id.Value, rolesList[0].Name), "approved", "2023-05-05T15:00:00.000Z");

            allUsers = new List<User> { user1, user2, user3, user4, user5, user6 };
        

            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[0].Id)).ReturnsAsync(allUsers[0]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[1].Id)).ReturnsAsync(allUsers[1]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[2].Id)).ReturnsAsync(allUsers[2]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[3].Id)).ReturnsAsync(allUsers[3]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[4].Id)).ReturnsAsync(allUsers[4]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[5].Id)).ReturnsAsync(allUsers[5]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(new UserId(currentUser.Id))).ReturnsAsync(currentUserDomain);

            // mocking task repo
            var task1 = new SurveillanceTask(new UserId(currentUser.Id), "Surveillance", null, new List<List<RobotMovement>>(), new PhoneNumber("987654321"), floorInfoList[0].Code, ApprovalStatus.approved);
            var task2 = new SurveillanceTask(new UserId(allUsers[0].Id.Value), "Surveillance", null, new List<List<RobotMovement>>(), new PhoneNumber("987654321"), floorInfoList[0].Code, ApprovalStatus.approved);
            var task3 = new SurveillanceTask(new UserId(allUsers[0].Id.Value), "Surveillance", null, new List<List<RobotMovement>>(), new PhoneNumber("987654321"), floorInfoList[0].Code, ApprovalStatus.approved);
            var task4 = new Mpt.Domain.Tasks.Task(new UserId(allUsers[0].Id.Value), "Surveillance", null, new List<List<RobotMovement>>(), ApprovalStatus.approved);
            tasksList = new List<Mpt.Domain.Tasks.Task> { task1, task2, task3, task4 };

            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, null, null)).ReturnsAsync(tasksList);
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, allUsers[0].Id.Value, null)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task> { tasksList[1], tasksList[2], tasksList[3] });
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, currentUser.Id, null)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task> { tasksList[1], tasksList[2], tasksList[3] });
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, null, ApprovalStatus.approved)).ReturnsAsync(tasksList);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(tasksList[0].Id)).ReturnsAsync(tasksList[0]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(tasksList[1].Id)).ReturnsAsync(tasksList[1]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(tasksList[2].Id)).ReturnsAsync(tasksList[2]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(tasksList[3].Id)).ReturnsAsync(tasksList[3]);
            _taskRepoMock.Setup(repo => repo.AddAsync(tasksList[0])).ReturnsAsync(tasksList[0]);
            _taskRepoMock.Setup(repo => repo.AddAsync(tasksList[1])).ReturnsAsync(tasksList[1]);
            _taskRepoMock.Setup(repo => repo.AddAsync(tasksList[2])).ReturnsAsync(tasksList[2]);

            //mocking unit of work (injection)
            // Simulating IConfiguration behavior using a dictionary
            var configDictionary = new Dictionary<string, string>
                {
                    { "EmailDomain", _emailDomain },
                    { "DefaultRole", _defaultRole },
                };

            var configuration = new ConfigurationBuilder().AddInMemoryCollection(configDictionary).Build();
            _configMock = new Mock<IConfiguration>();
            _configMock.Setup(x => x.GetSection(It.IsAny<string>())).Returns(configuration.GetSection);
            _configMock.Setup(x => x[It.IsAny<string>()]).Returns<string>(key => configuration[key]);


            //creating services
            _taskService = new TaskService(_configMock.Object, _unitOfWorkMock.Object, _taskRepoMock.Object, _userRepoMock.Object, _httpClientMock.Object);

            //creating controller
            _controller = new TasksController(_taskService);

            // Set HttpContext task item
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _controller.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the task in HttpContext.Items


            // Set authorization header for testing purposes
            _controller.Request.Headers["Authorization"] = "Bearer token";

        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetByIdAsync_Ok()
        {
            // Arrange
            var id = new Guid(tasksList[0].Id.Value);

            var taskDto = new TaskDto(id.ToString(), new List<string>(), tasksList[0].IsCompleted,
                    tasksList[0].TaskType, new UserTaskInfoDto(currentUser.Email, currentUser.Name, currentUser.Phone),
                    tasksList[0].IsApproved.ToString(), tasksList[0].LastUpdated.ToString(), new List<List<RobotMovementDto>>());

            // Act
            var result = await _controller.GetById(id);

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(TaskDto));
            var task = okResult.Value as TaskDto;
            Assert.AreEqual(taskDto.Id, task.Id);
            Assert.AreEqual(taskDto.IsCompleted, task.IsCompleted);
            Assert.AreEqual(taskDto.TaskType, task.TaskType);
            Assert.AreEqual(taskDto.User.Email, task.User.Email);
            Assert.AreEqual(taskDto.User.Name, task.User.Name);
            Assert.AreEqual(taskDto.User.Phone, task.User.Phone);
            Assert.AreEqual(taskDto.IsApproved, task.IsApproved);

        }


        [TestMethod]
        public async System.Threading.Tasks.Task Approve_Ok()
        {
            // Arrange
            var id = new Guid(tasksList[0].Id.Value);
            var isApproved = new IsApprovedDto(ApprovalStatus.approved.ToString());

            var taskSimpleDto = new TaskSimpleDto(tasksList[0].IsCompleted, tasksList[0].TaskType, tasksList[0].IsApproved.ToString(), tasksList[0].LastUpdated.ToString());

            // Act
            var result = await _controller.ApproveReject(id, isApproved);

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(TaskSimpleDto));
            var task = okResult.Value as TaskSimpleDto;
            Assert.AreEqual(taskSimpleDto.IsCompleted, task.IsCompleted);
            Assert.AreEqual(taskSimpleDto.TaskType, task.TaskType);
            Assert.AreEqual(taskSimpleDto.IsApproved, task.IsApproved);

        }

        // [TestMethod]
        // public async System.Threading.Tasks.Task Approve_Should_Fail_TaskNotFound(){
        //     // Arrange
        //     var id = new Guid("00000000-0000-0000-0000-000000000000");
        //     var isApproved = new IsApprovedDto(ApprovalStatus.approved.ToString());

        //     // Act
        //     var result = await _controller.ApproveReject(id, isApproved);

        //     // Assert
        //     var notFoundResult = result.Result as NotFoundObjectResult;
        //     Assert.IsNotNull(notFoundResult.Value);
        //     Assert.IsInstanceOfType(notFoundResult.Value, typeof(string));
        //     var message = notFoundResult.Value as string;
        //     Assert.AreEqual("Task not found", message);
        // }


    }
}
