using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;


using Mpt.Services;
using Mpt.IRepositories;
using Mpt.Core.Domain;
using Microsoft.Extensions.Configuration;

using Mpt.Dtos;
using Mpt.Domain.Users;
using Mpt.Domain.Roles;
using Mpt.Domain.Tasks;
using Mpt.Domain.Shared;
using System.Diagnostics;
using Mpt.Mappers;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace Services.Tests
{
    [TestClass]
    public class TaskServiceTests
    {
        private Mock<IConfiguration> _configMock;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<ITaskRepository> _taskRepoMock;
        private Mock<IUserRepository> _userRepoMock;
        private Mock<HttpClient> _httpClientMock;

        private TaskService _taskService;

        private string _emailDomain;
        private string _defaultRole;

        private List<Role> rolesList;
        private List<User> userList;
        private List<Mpt.Domain.Tasks.Task> taskList;
        private List<FloorInfoDto> floorInfoList;

        [TestInitialize]
        public void Initialize()
        {
            _configMock = new Mock<IConfiguration>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _taskRepoMock = new Mock<ITaskRepository>();
            _userRepoMock = new Mock<IUserRepository>();
            _httpClientMock = new Mock<HttpClient>();
            _emailDomain = "isep.ipp.pt";
            _defaultRole = "utente";


            var floor1 = new FloorInfoDto("1");
            var floor2 = new FloorInfoDto("2");
            var floor3 = new FloorInfoDto("3");
            floorInfoList = new List<FloorInfoDto> { floor1, floor2, floor3 };

            //role data
            rolesList = new List<Role> { new Role("utente") };


            //mocking user repo 
            var user1 = new User(new UserEmail("user1@isep.ipp.pt"), "user1", new PhoneNumber("987654321"), new UserNif("111222333"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user2 = new User(new UserEmail("user2@isep.ipp.pt"), "user2", new PhoneNumber("912345678"), new UserNif("111444555"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user3 = new User(new UserEmail("user3@isep.ipp.pt"), "user3", new PhoneNumber("956897413"), new UserNif("111666777"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user4 = new User(new UserEmail("user4@isep.ipp.pt"), "user4", new PhoneNumber("968987456"), new UserNif("111888999"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            user4.Disable();
            userList = new List<User> { user1, user2, user3, user4 };
            _userRepoMock.Setup(repo => repo.GetAllFilteredAsync(true, ApprovalStatus.approved)).ReturnsAsync(userList);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(userList[0].Id)).ReturnsAsync(userList[0]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(userList[1].Id)).ReturnsAsync(userList[1]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(userList[2].Id)).ReturnsAsync(userList[2]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(userList[3].Id)).ReturnsAsync(userList[3]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(userList[0].Email.Value)).ReturnsAsync(userList[0]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(userList[1].Email.Value)).ReturnsAsync(userList[1]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(userList[2].Email.Value)).ReturnsAsync(userList[2]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(userList[3].Email.Value)).ReturnsAsync(userList[3]);


            //mocking taks repo
            var task1 = new SurveillanceTask(new UserId(userList[0].Id.Value), "Surveillance", null, null, new PhoneNumber("987654321"), floorInfoList[0].Code, ApprovalStatus.approved);
            var task2 = new SurveillanceTask(new UserId(userList[0].Id.Value), "Surveillance", null, null, new PhoneNumber("987654321"), floorInfoList[0].Code, ApprovalStatus.approved);
            var task3 = new SurveillanceTask(new UserId(userList[0].Id.Value), "Surveillance", null, null, new PhoneNumber("987654321"), floorInfoList[0].Code, ApprovalStatus.approved);
            var task4 = new Mpt.Domain.Tasks.Task(new UserId(userList[0].Id.Value), "Surveillance", null, null, ApprovalStatus.approved);
            taskList = new List<Mpt.Domain.Tasks.Task> { task1, task2, task3, task4 };
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, userList[0].Id.Value, null)).ReturnsAsync(taskList);
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, null, ApprovalStatus.approved)).ReturnsAsync(taskList);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[0].Id)).ReturnsAsync(taskList[0]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[1].Id)).ReturnsAsync(taskList[1]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[2].Id)).ReturnsAsync(taskList[2]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[3].Id)).ReturnsAsync(taskList[3]);
            _taskRepoMock.Setup(repo => repo.AddAsync(taskList[0])).ReturnsAsync(taskList[0]);
            _taskRepoMock.Setup(repo => repo.AddAsync(taskList[1])).ReturnsAsync(taskList[1]);
            _taskRepoMock.Setup(repo => repo.AddAsync(taskList[2])).ReturnsAsync(taskList[2]);




            //mocking unit of work (injection)
            // Simulating IConfiguration behavior using a dictionary
            var configDictionary = new Dictionary<string, string>
                {
                    { "EmailDomain", _emailDomain },
                    { "DefaultRole", _defaultRole },
                    // Add other configuration keys and values as needed
                };

            var configuration = new ConfigurationBuilder().AddInMemoryCollection(configDictionary).Build();
            _configMock = new Mock<IConfiguration>();
            _configMock.Setup(x => x.GetSection(It.IsAny<string>())).Returns(configuration.GetSection);
            _configMock.Setup(x => x[It.IsAny<string>()]).Returns<string>(key => configuration[key]);


            _taskService = new TaskService(_configMock.Object, _unitOfWorkMock.Object, _taskRepoMock.Object, _userRepoMock.Object, _httpClientMock.Object);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task AddSurveillanceTaskAsync_Ok()
        {
            // Arrange
            var dto = new CreateSurveillanceTaskDto("1", "917564213");
            var userId = userList[0].Id.Value;
            var token = "token";

            // Act
            var result = await _taskService.AddSurveillanceTaskAsync(dto, userId, token);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(SurveillanceTaskSimpleDto));
        }

        [TestMethod]
        public async System.Threading.Tasks.Task AddSurveillanceTaskAsync_Fail()
        {
            // Arrange
            var dto = new CreateSurveillanceTaskDto("1", "917564213");
            var token = "token";
            var error = "Object reference not set to an instance of an object.";


            // Act
            var result = await _taskService.AddSurveillanceTaskAsync(dto, "00000000-0000-0000-0000-000000000000", token);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.AreEqual(error, result.Error.ToString());
        }

        //[TestMethod]
        //public async System.Threading.Tasks.Task AddPickupDeliveryTaskAsync_Ok()
        //{
        //    Arrange
        //   var dto = new CreatePickupDeliveryTaskDto(null, null, null, null, null, null, null, null, null, null, null);
        //    var userId = userList[0].Id.Value;

        //    Act
        //   var result = await _taskService.AddPickupDeliveryTaskAsync(dto, userId);

        //    Assert
        //    Assert.IsTrue(result.IsSuccess);
        //    Assert.IsNotNull(result.Value);
        //    Assert.IsInstanceOfType(result.Value, typeof(SurveillanceTaskSimpleDto));
        //}

        //[TestMethod]
        //public async System.Threading.Tasks.Task AddPickupDeliveryTaskAsync_Fail()
        //{
        //    // Arrange
        //    var dto = new CreatePickupDeliveryTaskDto(null, null, null, null, null, null, null, null, null, null, null);
        //    var userId = userList[0].Id.Value;
        //    var error = "Nenhuma ligação pôde ser feita porque o computador de destino\r\nas recusou ativamente. (localhost:5000)";

        //    // Act
        //    var result = await _taskService.AddPickupDeliveryTaskAsync(dto, userId);

        //    // Assert
        //    Assert.IsFalse(result.IsSuccess);
        //    Assert.IsNotNull(result.Error);
        //    Assert.AreEqual(error, result.Error.ToString());
        //}

        [TestMethod]
        public async System.Threading.Tasks.Task GetAllAsync_Ok()
        {
            // Arrange
            var token = "token";
            var tasksDto = MapTasksToDto(taskList);

            // Act
            var result = await _taskService.GetAllAsync(token, null, userList[0].Id.Value, null);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(List<TaskDto>));
            Assert.AreEqual(tasksDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetAllAsync_Fail()
        {
            // Arrange
            var token = "token";
            var error = "Object reference not set to an instance of an object.";

            // Act
            var result = await _taskService.GetAllAsync(token, null, "00000000-0000-0000-0000-000000000000", null);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetByIdAsync_Ok()
        {
            // Arrange
            var id = new Guid(taskList[0].Id.Value);

            var taskDto = TaskMapper.ToFullDto(taskList[0], UserMapper.ToDtoTaskInfo(userList[0]));

            // Act
            var result = await _taskService.GetByIdAsync(id);

            Console.WriteLine(result.Value);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(TaskDto));
            Assert.AreEqual(taskDto.ToString(), result.Value.ToString());

        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetByIdAsync_TaskNotFound()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Task not found.";

            // Act
            var result = await _taskService.GetByIdAsync(id);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetByIdAsync_WeirdTask()
        {
            // Arrange
            var id = new Guid(taskList[3].Id.Value);
            var error = "This task is weird...";

            // Act
            var result = await _taskService.GetByIdAsync(id);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task DeleteAsync_Ok()
        {
            // Arrange
            var id = new Guid(taskList[0].Id.Value);


            // Act
            var result = await _taskService.DeleteAsync(id);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(string));
            Assert.AreEqual("Deleted successfully.", result.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task DeleteAsync_TaskNotFound()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Task not found.";


            // Act
            var result = await _taskService.DeleteAsync(id);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetMyTasksAsync_Ok()
        {
            // Arrange
            var token = "token";

            // Act
            var result = await _taskService.GetMyTasksAsync(token, null, userList[0].Id.Value, null);

            var simpleTasksDto = MapTasksToSimpleDto(taskList);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(List<TaskSimpleDto>));
            Assert.AreEqual(simpleTasksDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetMyTasksAsync_Fail()
        {
            // Arrange
            var token = "token";
            var error = "Object reference not set to an instance of an object.";


            // Act
            var result = await _taskService.GetMyTasksAsync(token, null, "00000000-0000-0000-0000-000000000000", null);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task UpdateIsApprovedAsync_Ok()
        {
            // Arrange
            var id = new Guid(taskList[0].Id.Value);
            var isApproved = new IsApprovedDto(ApprovalStatus.approved.ToString());

            var taskSimpleDto = TaskMapper.ToDto(taskList[0]);   

            // Act
            var result = await _taskService.UpdateIsApprovedAsync(id, isApproved);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(TaskSimpleDto));
            Assert.AreEqual(taskSimpleDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task UpdateIsApprovedAsync_TaskNotFound()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var isApproved = new IsApprovedDto(ApprovalStatus.approved.ToString());
            var error = "Task not found.";

            // Act
            var result = await _taskService.UpdateIsApprovedAsync(id, isApproved);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        private List<TaskDto> MapTasksToDto(IEnumerable<Mpt.Domain.Tasks.Task> tasks)
        {
            var tasksDto = new List<TaskDto>();

            foreach (var task in tasks)
            {
                // get user
                var user = userList.Find(m => m.Id == task.UserId);
                var userDto = UserMapper.ToDtoTaskInfo(user);

                if (task is SurveillanceTask surveillanceTask)
                {
                    // get floor info
                    var floorInfo = floorInfoList[Convert.ToInt32(surveillanceTask.FloorId)];
                    tasksDto.Add(TaskMapper.ToFullDto(surveillanceTask, floorInfo.Code, userDto));
                }
                else if (task is PickupDeliveryTask pickupDeliveryTask)
                {
                    tasksDto.Add(TaskMapper.ToFullDto(pickupDeliveryTask, userDto));
                }
            }

            return tasksDto;
        }

        private List<TaskSimpleDto> MapTasksToSimpleDto(IEnumerable<Mpt.Domain.Tasks.Task> tasks)
        {
            var tasksDto = new List<TaskSimpleDto>();

            foreach (var task in tasks)
            {
                if (task is SurveillanceTask surveillanceTask)
                {
                    // get floor info
                    var floorInfo = floorInfoList[Convert.ToInt32(surveillanceTask.FloorId)];
                    tasksDto.Add(TaskMapper.ToDto(surveillanceTask, floorInfo.Code));
                }
                else if (task is PickupDeliveryTask pickupDeliveryTask)
                {
                    tasksDto.Add(TaskMapper.ToDto(pickupDeliveryTask));
                }
            }

            return tasksDto;
        }
    }
}
