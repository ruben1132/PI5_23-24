using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

using Mpt.Services;
using Mpt.IRepositories;
using Mpt.Core.Domain;
using Microsoft.Extensions.Configuration;

using Mpt.Dtos;
using Mpt.Domain.Users;
using Mpt.Domain.Roles;

namespace unit.Services
{
    [TestClass]
    public class UserServiceTests
    {
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
            rolesList = new List<Role> { new Role("utente") };
            _roleRepoMock.Setup(repo => repo.GetAllFilteredAsync(true)).ReturnsAsync(rolesList);
            _roleRepoMock.Setup(repo => repo.GetByIdAsync(rolesList[0].Id)).ReturnsAsync(rolesList[0]);
            _roleRepoMock.Setup(repo => repo.GetByNameAsync(rolesList[0].Name)).ReturnsAsync(rolesList[0]);

            //mocking user repo 
            var user1 = new User(new UserEmail("user1@isep.ipp.pt"), "user1", new Mpt.Domain.Shared.PhoneNumber("987654321"), new UserNif("111222333"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user2 = new User(new UserEmail("user2@isep.ipp.pt"), "user2", new Mpt.Domain.Shared.PhoneNumber("912345678"), new UserNif("111444555"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user3 = new User(new UserEmail("user3@isep.ipp.pt"), "user3", new Mpt.Domain.Shared.PhoneNumber("956897413"), new UserNif("111666777"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
            var user4 = new User(new UserEmail("user4@isep.ipp.pt"), "user4", new Mpt.Domain.Shared.PhoneNumber("968987456"), new UserNif("111888999"), rolesList[0].Id, new UserPassword("Pa$$w0rd!!"), ApprovalStatus.approved);
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


            //creating services
            _userService = new UserService(_configMock.Object, _unitOfWorkMock.Object, _userRepoMock.Object, _roleRepoMock.Object, _taskRepoMock.Object);
        }

        [TestMethod]
        public async Task GetAllAsync_ShouldReturnOkResult()
        {

            // Act
            var result = await _userService.GetAllAsync(true, ApprovalStatus.approved.ToString());

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(List<UserWithRoleDto>));
            Assert.AreEqual(4, (result.Value as List<UserWithRoleDto>).Count);
        }

        [TestMethod]
        public async Task GetAllAsync_ShouldReturnFailResult()
        {

            var error = "Requested value 'error' was not found.";
            // Act
            var result = await _userService.GetAllAsync(null, "error");

            // Assert
            Assert.IsFalse(result.IsSuccess);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());

        }

        [TestMethod]
        public async Task GetByIdAsync_ShouldReturnOkResult()
        {

            var resultGetAll = await _userService.GetAllAsync(true, ApprovalStatus.approved.ToString());
            var data = resultGetAll.Value as List<UserWithRoleDto>;

            // Arrange
            var id = data[0].Id;

            // Act
            var result = await _userService.GetByIdAsync(new Guid(id));

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.IsInstanceOfType(result.Value, typeof(UserWithRoleDto));
            Assert.AreEqual(data[0].ToString(), result.Value.ToString());



        }

        [TestMethod]
        public async Task GetByIdAsync_ShouldReturnFailResult()
        {

            var error = "User not found.";

            // Arrange
            var id = Guid.NewGuid();

            // Act
            var result = await _userService.GetByIdAsync(id);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task AddAsync_WithValidData_ReturnsOk()
        {

            // Arrange
            var createUserDto = new CreateUserDto("user5@isep.ipp.pt", "Pa$$w0rd!!", "user5", "999888777", "111234987", rolesList[0].Id.Value);

            // Act
            var result = await _userService.AddAsync(createUserDto);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(createUserDto.Email, result.Value.Email);
            Assert.AreEqual(createUserDto.RoleId, result.Value.Role.Id.ToString());
            Assert.AreEqual(createUserDto.Name, result.Value.Name);
        }

        [TestMethod]
        public async Task AddAsync_WithExistingEmail_ReturnsFail()
        {
            // Arrange
            var createUserDto = new CreateUserDto("user2@isep.ipp.pt", "Pa$$w0rd!!", "user1", "987654321", "111222333", rolesList[0].Id.Value);
            var error = "Email already exists.";

            // Act
            var result = await _userService.AddAsync(createUserDto);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task UpdateAsync_ShouldReturnOkResult_WhenUserExists()
        {
            // Arrange
            var userDto = new UserDto(userList[0].Id.Value, userList[0].Email.Value, "user111", userList[0].Phone.Value, userList[0].Nif.Value, userList[0].RoleId.Value);

            // Act
            var result = await _userService.UpdateAsync(userDto);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(userDto.Email, result.Value.Email);
            Assert.AreEqual(userDto.RoleId, result.Value.Role.Id.ToString());
            Assert.AreEqual(userDto.Name, result.Value.Name);
        }

        [TestMethod]
        public async Task UpdateAsync_ShouldReturnFailResult_WhenUserDoesNotExist()
        {
            // Arrange
            var userDto = new UserDto("00000000-0000-0000-0000-000000000000", userList[0].Email.Value, "user111", userList[0].Phone.Value, userList[0].Nif.Value, userList[0].RoleId.Value);
            var error = "User not found.";

            // Act
            var result = await _userService.UpdateAsync(userDto);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task DeleteAsync_ShouldReturnOkResult_WhenUserExistsAndIsNotActive()
        {
            // Arrange
            var userId = new Guid(userList[3].Id.Value);

            Console.WriteLine(userList[3].ToString());

            // Act
            var result = await _userService.DeleteAsync(userId);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(userId.ToString(), result.Value.Id.ToString());
        }

        [TestMethod]
        public async Task DeleteAsync_ShouldThrowBusinessRuleValidationException_WhenUserIsActive()
        {
            // Arrange
            var userId = new Guid(userList[2].Id.Value);

            var error = "It is not possible to delete an active user.";

            var result = await _userService.DeleteAsync(userId);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task DeleteIgnoringActiveAsync_ShouldReturnOk_WhenUserExists()
        {
            // Arrange
            var userId = new Guid(userList[3].Id.Value);

            // Act
            var result = await _userService.DeleteIgnoringActiveAsync(userId);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(userId.ToString(), result.Value.Id.ToString());
        }

        [TestMethod]
        public async Task DeleteIgnoringActiveAsync_ShouldReturnFail_WhenUserDoesNotExist()
        {
            // Arrange
            var userId = new Guid("00000000-0000-0000-0000-000000000000");

            var error = "User not found.";

            // Act
            var result = await _userService.DeleteIgnoringActiveAsync(userId);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task UpdateIsApprovedAsync_WithApprovedStatus_ReturnsOkResult()
        {
            // Arrange
            var id = new Guid(userList[3].Id.Value);
            var isApprovedDto = new IsApprovedDto(ApprovalStatus.approved.ToString());

            // Act
            var result = await _userService.UpdateIsApprovedAsync(id, isApprovedDto);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
        }

        [TestMethod]
        public async Task UpdateIsApprovedAsync_WithDisapprovedStatus_ReturnsOkResult()
        {
            // Arrange
            var id = new Guid(userList[3].Id.Value);
            var isApprovedDto = new IsApprovedDto(ApprovalStatus.rejected.ToString());

            // Act
            var result = await _userService.UpdateIsApprovedAsync(id, isApprovedDto);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
        }

        [TestMethod]
        public async Task UpdateIsApprovedAsync_WithInvalidUserId_ReturnsFailResult()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var isApprovedDto = new IsApprovedDto(ApprovalStatus.approved.ToString());
            var error = "User not found.";

            // Act
            var result = await _userService.UpdateIsApprovedAsync(id, isApprovedDto);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        public async Task GetUserAllInfo_ShouldReturnOkResult()
        {
            // Arrange
            var userId = new Guid(userList[0].Id.Value);
            var token = "token";

            var userDto = new UserDto(userList[0].Id.Value, userList[0].Email.Value, "user111", userList[0].Phone.Value, userList[0].Nif.Value, userList[0].RoleId.Value);
            var userWithTasks = new UserWithTasks(userDto, new List<TaskSimpleDto>());

            // Act
            var result = await _userService.GetUserAllInfo(userId, token);

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(userWithTasks, result.Value);
        }

        [TestMethod]
        public async Task GetUserAllInfo_ShouldReturnFailResult_WhenUserNotFound()
        {
            // Arrange
            var userId = new Guid("00000000-0000-0000-0000-000000000000");
            var token = "token";
            var error = "User not found.";

            // Act
            var result = await _userService.GetUserAllInfo(userId, token);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task GetMyProfileAsync_ShouldReturnOkResult()
        {
            // Arrange
            var userId = new Guid(userList[0].Id.Value);
            var userProfileDto = new UserProfileDto(userList[0].Email.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value);

            // Act
            var result = await _userService.GetMyProfileAsync(userId);


            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(userProfileDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async Task GetMyProfileAsync_ShouldReturnFailResult_WhenUserNotFound()
        {
            // Arrange
            var userId = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "User not found.";

            // Act
            var result = await _userService.GetMyProfileAsync(userId);

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

        [TestMethod]
        public async Task UpdateMyProfileAsync_ShouldReturnOk_WhenUserExists()
        {
            // Arrange
            var userId = new Guid(userList[0].Id.Value);
            var updateUserProfile = new UpdateUserProfile(userList[0].Email.Value, userList[0].Password.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value);
            var userProfileDto = new UserProfileDto(userList[0].Email.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value);
            // Act
            var result = await _userService.UpdateMyProfileAsync(updateUserProfile, userId.ToString());

            // Assert
            Assert.IsTrue(result.IsSuccess);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(userProfileDto.ToString(), result.Value.ToString());
        }

        [TestMethod]
        public async Task UpdateMyProfileAsync_ShouldReturnFail_WhenUserNotFound()
        {
            // Arrange
            var userId = new Guid("00000000-0000-0000-0000-000000000000");
            var updateUserProfile = new UpdateUserProfile(userList[0].Email.Value, userList[0].Password.Value, userList[0].Name, userList[0].Phone.Value, userList[0].Nif.Value);
            var error = "User not found.";

            // Act
            var result = await _userService.UpdateMyProfileAsync(updateUserProfile, userId.ToString());

            // Assert
            Assert.IsTrue(result.IsFailure);
            Assert.IsNotNull(result.Error);
            Assert.IsInstanceOfType(result.Error, typeof(string));
            Assert.AreEqual(error, result.Error.ToString());
        }

    }

}
