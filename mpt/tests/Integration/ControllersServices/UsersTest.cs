using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

using Mpt.Services;
using Mpt.IRepositories;
using Mpt.Core.Domain;
using Microsoft.Extensions.Configuration;

using Mpt.Dtos;
using Mpt.Domain.Users;
using Mpt.Domain.Roles;
using Mpt.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace tests.Integration
{
    [TestClass]
    public class UsersControllerServiceIntegrationTests
    {

        private UsersController _controller;
        private Mock<IConfiguration> _configMock;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IUserRepository> _userRepoMock;
        private Mock<IRoleRepository> _roleRepoMock;
        private Mock<ITaskRepository> _taskRepoMock;
        private UserService _userService;
        private string _emailDomain;
        private string _defaultRole;
        private List<Role> rolesList;
        private List<User> userList;
        private List<User> sysUserList;
        private List<User> userListApproved;
        private List<User> allUsers;
        private List<Mpt.Domain.Tasks.Task> tasksList;
        private UserWithRoleDto currentUser;

        [TestInitialize]
        public void Setup()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _userRepoMock = new Mock<IUserRepository>();
            _roleRepoMock = new Mock<IRoleRepository>();
            _taskRepoMock = new Mock<ITaskRepository>();
            _emailDomain = "isep.ipp.pt";
            _defaultRole = "utente";

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

            // for create user
            var newUser = new User(new UserEmail("biggerJohnDoe@isep.ipp.pt"), "johnDoe", new Mpt.Domain.Shared.PhoneNumber("915698742"), new UserNif("123456789"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.pending);

            // for current user
            var currentUserDomain = new User(new UserEmail("jane.doe@isep.ipp.pt"), "Jane Doe", new Mpt.Domain.Shared.PhoneNumber("912345678"), new UserNif("123456789"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.pending);
            currentUser = new UserWithRoleDto(currentUserDomain.Id.Value, "jane.doe@isep.ipp.pt", "Jane Doe", "912345678", "123456789", true, new RoleDto(rolesList[0].Id.Value, rolesList[0].Name), "approved", "2023-05-05T15:00:00.000Z");

            allUsers = new List<User> { user1, user2, user3, user4, user5, user6 };
            userList = new List<User> { user1, user2, user3, user4 };
            userListApproved = new List<User> { user1, user2, user3 };
            sysUserList = new List<User> { user5, user6 };

            _userRepoMock.Setup(repo => repo.AddAsync(It.IsAny<User>())).ReturnsAsync(newUser);
            _userRepoMock.Setup(repo => repo.GetAllFilteredAsync(false, null)).ReturnsAsync(userList);
            _userRepoMock.Setup(repo => repo.GetAllFilteredAsync(true, ApprovalStatus.approved)).ReturnsAsync(sysUserList);
            _userRepoMock.Setup(repo => repo.GetAllFilteredAsync(false, ApprovalStatus.approved)).ReturnsAsync(userListApproved);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[0].Id)).ReturnsAsync(allUsers[0]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[1].Id)).ReturnsAsync(allUsers[1]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[2].Id)).ReturnsAsync(allUsers[2]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[3].Id)).ReturnsAsync(allUsers[3]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[4].Id)).ReturnsAsync(allUsers[4]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(allUsers[5].Id)).ReturnsAsync(allUsers[5]);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(newUser.Id)).ReturnsAsync(newUser);
            _userRepoMock.Setup(repo => repo.GetByIdAsync(new UserId(currentUser.Id))).ReturnsAsync(currentUserDomain);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(allUsers[0].Email.Value)).ReturnsAsync(allUsers[0]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(allUsers[1].Email.Value)).ReturnsAsync(allUsers[1]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(allUsers[2].Email.Value)).ReturnsAsync(allUsers[2]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(allUsers[3].Email.Value)).ReturnsAsync(allUsers[3]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(allUsers[4].Email.Value)).ReturnsAsync(allUsers[4]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(allUsers[5].Email.Value)).ReturnsAsync(allUsers[5]);
            _userRepoMock.Setup(repo => repo.GetByEmailAsync(currentUser.Email)).ReturnsAsync(currentUserDomain);

            // mocking task repo
            var task1 = new Mpt.Domain.Tasks.Task(currentUserDomain.Id, "PickupDelivery", new List<string>(), new List<List<Mpt.Domain.Tasks.RobotMovement>>(), ApprovalStatus.approved, DateTime.UtcNow);
            var task2 = new Mpt.Domain.Tasks.Task(currentUserDomain.Id, "PickupDelivery", new List<string>(), new List<List<Mpt.Domain.Tasks.RobotMovement>>(), ApprovalStatus.pending, DateTime.UtcNow);
            var task3 = new Mpt.Domain.Tasks.Task(currentUserDomain.Id, "PickupDelivery", new List<string>(), new List<List<Mpt.Domain.Tasks.RobotMovement>>(), ApprovalStatus.rejected, DateTime.UtcNow);
            var task4 = new Mpt.Domain.Tasks.Task(currentUserDomain.Id, "Surveillance", new List<string>(), new List<List<Mpt.Domain.Tasks.RobotMovement>>(), ApprovalStatus.approved, DateTime.UtcNow);
            var task5 = new Mpt.Domain.Tasks.Task(currentUserDomain.Id, "Surveillance", new List<string>(), new List<List<Mpt.Domain.Tasks.RobotMovement>>(), ApprovalStatus.pending, DateTime.UtcNow);
            var task6 = new Mpt.Domain.Tasks.Task(user1.Id, "PickupDelivery", new List<string>(), new List<List<Mpt.Domain.Tasks.RobotMovement>>(), ApprovalStatus.approved, DateTime.UtcNow);
            tasksList = new List<Mpt.Domain.Tasks.Task> { task1, task2, task3, task4, task5, task6 };

            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, currentUserDomain.Id.Value, null)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task>() { task1, task2, task3, task4, task5 });
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync("PickupDelivery", currentUserDomain.Id.Value, null)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task>() { task1, task2, task3 });
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync("PickupDelivery", currentUserDomain.Id.Value, ApprovalStatus.approved)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task>() { task1 });
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync("PickupDelivery", currentUserDomain.Id.Value, ApprovalStatus.pending)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task>() { task2 });
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync("PickupDelivery", currentUserDomain.Id.Value, ApprovalStatus.rejected)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task>() { task3 });
            _taskRepoMock.Setup(repo => repo.GetAllFilteredAsync(null, currentUserDomain.Id.Value, ApprovalStatus.approved)).ReturnsAsync(new List<Mpt.Domain.Tasks.Task>() { task1, task4 });


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
            _userService = new UserService(_configMock.Object, _unitOfWorkMock.Object, _userRepoMock.Object, _roleRepoMock.Object, _taskRepoMock.Object);

            //creating controller
            _controller = new UsersController(_userService);

            // Set HttpContext user item
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _controller.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the user in HttpContext.Items


            // Set authorization header for testing purposes
            _controller.Request.Headers["Authorization"] = "Bearer token";

        }

        [TestMethod]
        public async Task GetAll_Should_Return_OkResult_With_Users()
        {
            // Arrange
            bool? isSysUser = false;
            string? isApproved = null;

            // Act
            var result = await _controller.GetAll(isSysUser, isApproved);

            // parse string to enum
            ApprovalStatus? parsedApproved = null;
            if (isApproved != null)
            {
                isApproved = isApproved.ToLower();
                parsedApproved = (ApprovalStatus)Enum.Parse(typeof(ApprovalStatus), isApproved, true);
            }

            _userRepoMock.Verify(repo => repo.GetAllFilteredAsync(isSysUser ?? false, parsedApproved), Times.Once);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(IEnumerable<UserWithRoleDto>));
            var userList = okResult.Value as IEnumerable<UserWithRoleDto>;
            Assert.AreEqual(4, userList.Count());
        }

        [TestMethod]
        public async Task GetAllApproved_Should_Return_OkResult_With_Users()
        {
            // Arrange
            bool? isSysUser = false;
            string? isApproved = "approved";

            // Act
            var result = await _controller.GetAll(isSysUser, isApproved);

            // parse string to enum
            ApprovalStatus? parsedApproved = null;
            if (isApproved != null)
            {
                isApproved = isApproved.ToLower();
                parsedApproved = (ApprovalStatus)Enum.Parse(typeof(ApprovalStatus), isApproved, true);
            }

            _userRepoMock.Verify(repo => repo.GetAllFilteredAsync(isSysUser ?? false, parsedApproved), Times.Once);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(IEnumerable<UserWithRoleDto>));
            var userList = okResult.Value as IEnumerable<UserWithRoleDto>;
            Assert.AreEqual(3, userList.Count());
        }

        [TestMethod]
        public async Task GetMyProfile_Should_Return_OkResult_With_User()
        {
            // Arrange
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "jane.doe@isep.ipp.pt", "Jane Doe", "912345678", "123456789", true, new RoleDto(rolesList[0].Id.Value, rolesList[0].Name), "approved", "2023-05-05T15:00:00.000Z");

            // Act
            var result = await _controller.GetMyProfile();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserProfileDto));
            var user = okResult.Value as UserProfileDto;
            Assert.AreEqual(currentUser.Email, user.Email);
            Assert.AreEqual(currentUser.Name, user.Name);
            Assert.AreEqual(currentUser.Phone, user.Phone);
            Assert.AreEqual(currentUser.Nif, user.Nif);
        }

        [TestMethod]
        public async Task GetUserAllInfo_Should_Return_OkResult_With_UserAllInfo()
        {
            // Arrange
            // get current user tasks
            var userInfo = new UserWithTasks(new UserDto(currentUser.Id, currentUser.Email, currentUser.Name, currentUser.Phone, currentUser.Nif, currentUser.Role.Id), new List<TaskSimpleDto>());

            // Act
            var result = await _controller.GetUserAllInfo();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithTasks));
            var user = okResult.Value as UserWithTasks;
            Assert.AreEqual(userInfo.user.Email, user.user.Email);
            Assert.AreEqual(userInfo.user.Name, user.user.Name);
            Assert.AreEqual(userInfo.user.Phone, user.user.Phone);
            Assert.AreEqual(userInfo.user.Nif, user.user.Nif);
            Assert.AreEqual(0, userInfo.tasks.Count());

        }

        [TestMethod]
        public async Task Create_Should_Return_OkResult_With_User()
        {
            // Arrange
            var userDto = new CreateUserDto("biggerJohnDoe@isep.ipp.pt", "Pa$$w0rd!!", "johnDoe", "915698742", "123456789", rolesList[0].Id.Value);

            // Act
            var result = await _controller.Create(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var user = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(userDto.Email, user.Email);
            Assert.AreEqual(userDto.Name, user.Name);
            Assert.AreEqual(userDto.Phone, user.Phone);
            Assert.AreEqual(userDto.Nif, user.Nif);
            Assert.AreEqual(userDto.RoleId, user.Role.Id);
        }

        [TestMethod]
        public async Task Create_Should_Fail_InvalidEmail()
        {
            // Arrange
            var userDto = new CreateUserDto("john.doe@gmail.com", "Pa$$w0rd!!", "johnDoe", "915698742", "123456789", rolesList[0].Id.Value);

            // Act
            var result = await _controller.Create(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Invalid email address" }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task Create_Should_Fail_EmailAlreadyInUse()
        {
            // Arrange
            var userDto = new CreateUserDto("user1@isep.ipp.pt", "Pa$$w0rd!!", "johnDoe", "915698742", "123456789", rolesList[0].Id.Value);

            // Act
            var result = await _controller.Create(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Email already exists." }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task Create_Should_Fail_InvalidPhoneNumber()
        {
            // Arrange
            var userDto = new CreateUserDto("dddd@isep.ipp.pt", "Pa$$w0rd!!", "johnDoe", "", "123456789", rolesList[0].Id.Value);

            // Act
            var result = await _controller.Create(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Invalid phone number" }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task Create_Should_Fail_InvalidNif()
        {
            // Arrange
            var userDto = new CreateUserDto("dddd@isep.ipp.pt", "Pa$$w0rd!!", "johnDoe", "912345678", "", rolesList[0].Id.Value);

            // Act
            var result = await _controller.Create(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Invalid NIF" }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task Update_Should_Return_OkResult_With_User()
        {
            // Arrange
            var userDto = new UserDto(userList[0].Id.Value, userList[0].Email.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value, rolesList[0].Id.Value);

            // Act
            var result = await _controller.Update(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var user = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(userDto.Email, user.Email);
            Assert.AreEqual(userDto.Name, user.Name);
            Assert.AreEqual(userDto.Phone, user.Phone);
            Assert.AreEqual(userDto.Nif, user.Nif);
            Assert.AreEqual(userDto.RoleId, user.Role.Id);
        }

        [TestMethod]
        public async Task Update_Should_Fail_EmailAlreadyInUse()
        {
            // Arrange
            var userDto = new UserDto(userList[0].Id.Value, userList[1].Email.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value, rolesList[0].Id.Value);

            // Act
            var result = await _controller.Update(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Email already exists." }.ToString(), badResult.Value.ToString());
        }

        [TestMethod]
        public async Task Update_Should_Fail_InvalidNif()
        {
            // Arrange
            var userDto = new UserDto(userList[0].Id.Value, userList[0].Email.Value, userList[0].Name, userList[0].Phone.Value, "", rolesList[0].Id.Value);

            // Act
            var result = await _controller.Update(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Invalid NIF" }.ToString(), badResult.Value.ToString());
        }

        [TestMethod]
        public async Task Update_Should_Fail_UserNotFound()
        {
            // Arrange
            var userDto = new UserDto("00000000-0000-0000-0000-000000000000", userList[0].Email.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value, rolesList[0].Id.Value);

            // Act
            var result = await _controller.Update(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var notFoundResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "User not found." }.ToString(), notFoundResult.Value.ToString());
        }

        [TestMethod]
        public async Task UpdateMyProfile_Should_Return_OkResult_With_User()
        {
            // Arrange
            var userDto = new UpdateUserProfile(currentUser.Email, null, currentUser.Name, currentUser.Phone, currentUser.Nif);

            // Act
            var result = await _controller.UpdateMyProfile(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserProfileDto));
            var user = okResult.Value as UserProfileDto;
            Assert.AreEqual(userDto.Name, user.Name);
            Assert.AreEqual(userDto.Phone, user.Phone);
            Assert.AreEqual(userDto.Nif, user.Nif);
        }

        [TestMethod]
        public async Task UpdateMyProfile_Should_Fail_InvalidNif()
        {
            // Arrange
            var userDto = new UpdateUserProfile(currentUser.Email, null, currentUser.Name, currentUser.Phone, "");

            // Act
            var result = await _controller.UpdateMyProfile(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Invalid NIF" }.ToString(), badResult.Value.ToString());
        }

        [TestMethod]
        public async Task UpdateMyProfile_Should_Fail_EmailAlreadyInUser()
        {
            // Arrange
            var userDto = new UpdateUserProfile(userList[1].Email.Value, null, currentUser.Name, currentUser.Phone, currentUser.Nif);

            // Act
            var result = await _controller.UpdateMyProfile(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "Email already exists." }.ToString(), badResult.Value.ToString());

        }

        [TestMethod]
        public async Task Approve_Should_Return_OkResult_With_User()
        {
            // Arrange
            var isApproved = new IsApprovedDto("approved");

            // Act
            var result = await _controller.ApproveReject(new Guid(userList[3].Id.Value), isApproved);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserDto));
            var user = okResult.Value as UserDto;
            Assert.AreEqual(userList[3].Email.Value, user.Email);
            Assert.AreEqual(userList[3].Name, user.Name);
            Assert.AreEqual(userList[3].Phone.Value, user.Phone);
            Assert.AreEqual(userList[3].Nif.Value, user.Nif);
            Assert.AreEqual(userList[3].RoleId.Value, user.RoleId);
        }

        [TestMethod]
        public async Task Approve_Should_Fail_UserNotFound()
        {
            // Arrange
            var isApproved = new IsApprovedDto("approved");

            // Act
            var result = await _controller.ApproveReject(new Guid("00000000-0000-0000-0000-000000000000"), isApproved);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var notFoundResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = "User not found." }.ToString(), notFoundResult.Value.ToString());
        }

        [TestMethod]
        public async Task DeleteMyProfile_Should_Return_OkResult_With_Message()
        {
            // Act
            var result = await _controller.DeleteMyProfile();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(new { message = "User profile deleted successfully" }.ToString(), okResult.Value.ToString());

        }

    }
}
