using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

using Mpt.Services;
using Mpt.IRepositories;
using Mpt.Core.Domain;
using Microsoft.Extensions.Configuration;

using Mpt.Dtos;
using Mpt.Domain.Roles;
using Mpt.Domain.Users;
using Mpt.Domain.Shared;
using Mpt.Domain.Tasks;
using Mpt.Domain.Plannings;
using System.Diagnostics;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Services.Tests
{
    [TestClass]
    public class PlanningServiceTests
    {
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IPlanningRepository> _planningRepoMock;
        private Mock<ITaskRepository> _taskRepoMock;
        private Mock<IUserRepository> _userRepoMock;
        private Mock<HttpClient> _httpClientMock;
        private Mock<IConfiguration> _configMock;

        private PlanningService _planningService;

        private string _emailDomain;
        private string _defaultRole;

        private List<Role> rolesList;
        private List<User> userList;
        private List<Mpt.Domain.Tasks.Task> taskList;
        private List<FloorInfoDto> floorInfoList;
        private List<Planning> planningsList;


        [TestInitialize]
        public void Setup()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _planningRepoMock = new Mock<IPlanningRepository>();
            _taskRepoMock = new Mock<ITaskRepository>();
            _userRepoMock = new Mock<IUserRepository>();
            _httpClientMock = new Mock<HttpClient>();
            _configMock = new Mock<IConfiguration>();
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
            taskList = new List<Mpt.Domain.Tasks.Task> { task1, task2, task3 };
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, userList[0].Id.Value, null)).ReturnsAsync(taskList);
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, null, ApprovalStatus.approved)).ReturnsAsync(taskList);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[0].Id)).ReturnsAsync(taskList[0]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[1].Id)).ReturnsAsync(taskList[1]);
            _taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[2].Id)).ReturnsAsync(taskList[2]);
            //_taskRepoMock.Setup(repo => repo.GetByIdAsync(taskList[3].Id)).ReturnsAsync(taskList[3]);

            var tasks = new List<string>() { taskList[0].Id.Value, taskList[1].Id.Value, taskList[2].Id.Value };
            var dto = new CreatePlanningDto(tasks);
            var taskIds = dto.Tasks.Select(t => new TaskId(t)).ToList();
            _taskRepoMock.Setup(repo => repo.GetByIdsAsync(taskIds)).ReturnsAsync(taskList);

            //_taskRepoMock.Setup(repo => repo.AddAsync(taskList[0])).ReturnsAsync(taskList[0]);
            //_taskRepoMock.Setup(repo => repo.AddAsync(taskList[1])).ReturnsAsync(taskList[1]);
            //_taskRepoMock.Setup(repo => repo.AddAsync(taskList[2])).ReturnsAsync(taskList[2]);

            //mocking planning repo
            var planning1 = new Planning(0, new UserId(userList[0].Id.Value));
            var planning2 = new Planning(0, new UserId(userList[0].Id.Value));
            var planning3 = new Planning(0, new UserId(userList[0].Id.Value));
            planningsList = new List<Planning> { planning1, planning2, planning3 };
            _planningRepoMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(planningsList);
            _planningRepoMock.Setup(repo => repo.GetByIdAsync(planningsList[0].Id)).ReturnsAsync(planningsList[0]);
            _planningRepoMock.Setup(repo => repo.GetByIdAsync(planningsList[1].Id)).ReturnsAsync(planningsList[1]);
            _planningRepoMock.Setup(repo => repo.GetByIdAsync(planningsList[2].Id)).ReturnsAsync(planningsList[2]);



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



            _planningService = new PlanningService(_configMock.Object, _unitOfWorkMock.Object, _planningRepoMock.Object, _taskRepoMock.Object, _userRepoMock.Object, _httpClientMock.Object);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetAllAsync_Ok()
        {
            // Act
            var result = await _planningService.GetAllAsync();

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(List<PlanningFullDto>));
            Assert.AreEqual(planningsList.Count, (result.Value as List<PlanningFullDto>).Count);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetByIdAsync_Ok()
        {
            // Arrange
            var planningId = new Guid(planningsList[0].Id.Value);

            var planningFullDto = new PlanningFullDto("00000000-0000-0000-0000-000000000000", null, 0, null);

            // Act
            var result = await _planningService.GetByIdAsync(planningId);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(PlanningFullDto));
            Assert.AreEqual(planningFullDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task GetByIdAsync_Fail()
        {
            // Arrange
            var planningId = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Planning not found.";

            // Act
            var result = await _planningService.GetByIdAsync(planningId);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task AddAsync_Ok()
        {
            // Arrange
            var tasks = new List<string>() { taskList[0].Id.Value, taskList[1].Id.Value, taskList[2].Id.Value };
            var dto = new CreatePlanningDto(tasks);
            var userId = new Guid(userList[0].Id.Value);

            var userProfileDto = new UserProfileDto(userList[0].Email.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value);
            var planningFullDto = new PlanningFullDto(new Guid().ToString(), new List<TaskSimpleDto>(), 0, userProfileDto);

            // Act
            var result = await _planningService.AddAsync(dto, userId);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(PlanningFullDto));
            Assert.AreEqual(planningFullDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task DeleteAsync_Ok()
        {
            // Arrange
            var planningId = new Guid(planningsList[0].Id.Value);
            var planningSimpleDto = new PlanningSimpleDto("00000000-0000-0000-0000-000000000000", 0, userList[0].Id.Value);

            // Act
            var result = await _planningService.DeleteAsync(planningId);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(PlanningSimpleDto));
            Assert.AreEqual(planningSimpleDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async System.Threading.Tasks.Task DeleteAsync_Fail()
        {
            // Arrange
            var planningId = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Planning not found.";

            // Act
            var result = await _planningService.DeleteAsync(planningId);

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }
    }
}
