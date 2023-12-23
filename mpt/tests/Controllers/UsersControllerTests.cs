using Microsoft.VisualStudio.TestTools.UnitTesting;

using Moq;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mpt.Core.Logic;
using Sprache;
using System.Text.Json.Nodes;

using Mpt.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace tests.Controllers
{
    [TestClass()]
    public class UsersControllerTests
    {
        private Mock<IUserService> _userServiceMock;
        private UsersController _controller;

        [TestInitialize]
        public void Setup()
        {
            _userServiceMock = new Mock<IUserService>();
            _controller = new UsersController(_userServiceMock.Object);

            // Arrange
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            // Set HttpContext user item
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();
            _controller.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the user in HttpContext.Items


            // Set authorization header for testing purposes
            _controller.Request.Headers["Authorization"] = "Bearer token"; // Replace with your test token


            // Insert the necessary data using the mock UserService
            var userDto = new CreateUserDto("john.doe@example.com", "Pa$$w0rd!!", "johnDoe", null, null, new Guid().ToString());
            var userWithRoleDto = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            _userServiceMock.Setup(x => x.AddAsync(userDto)).ReturnsAsync(Result<UserWithRoleDto>.Ok(userWithRoleDto));
        }

        [TestMethod()]
        public async Task Create_Should_Return_OkResult_When_Successful()
        {
            // Arrange
            var userDto = new CreateUserDto("john.doe@example.com", "Pa$$w0rd!!", "johnDoe", "915698742", "123456789", new Guid().ToString());
            var userWithRoleDto = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            _userServiceMock.Setup(x => x.AddAsync(userDto)).ReturnsAsync(Result<UserWithRoleDto>.Ok(userWithRoleDto));

            // Act
            var result = await _controller.Create(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var createdUser = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(userDto.Email, createdUser.Email);
        }

        [TestMethod]
        public async Task Create_ReturnsBadRequestResult_WhenUserServiceFails()
        {
            // Arrange
            var user = new CreateUserDto(null, null, null, null, null, null);
            var error = "Error message";
            _userServiceMock.Setup(x => x.AddAsync(user)).ReturnsAsync(Result<UserWithRoleDto>.Fail(error));

            // Act
            var result = await _controller.Create(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod()]
        public async Task GetAll_Should_Return_OkResult_With_Users()
        {
            // Arrange
            bool? isSysUser = null;
            string? isApproved = null;
            var users = new List<UserWithRoleDto>()
            {
                new UserWithRoleDto ("00000000-0000-0000-0000-000000000000", null, null, null, null, false, new RoleDto(null, null, null), null, null),
                new UserWithRoleDto ("00000000-0000-0000-0000-000000000001", null, null, null, null, false, new RoleDto(null, null, null), null, null),
            };

            _userServiceMock.Setup(x => x.GetAllAsync(isSysUser, isApproved)).ReturnsAsync(Result<List<UserWithRoleDto>>.Ok(users));

            // Act
            var result = await _controller.GetAll(isSysUser, isApproved);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(IEnumerable<UserWithRoleDto>));
            var userList = okResult.Value as IEnumerable<UserWithRoleDto>;
            Assert.AreEqual(users.Count, userList.Count());
        }

        [TestMethod]
        public async Task GetAll_ReturnsBadRequestResult_WhenUsersServiceFails()
        {
            // Arrange
            bool? isSysUser = null;
            string? isApproved = null;
            var error = "Error message";
            _userServiceMock.Setup(x => x.GetAllAsync(isSysUser, isApproved)).ReturnsAsync(Result<List<UserWithRoleDto>>.Fail(error));

            // Act
            var result = await _controller.GetAll(isSysUser, isApproved);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod()]
        public async Task GetById_Should_Return_OkResult_With_User()
        {
            // Arrange
            string userId = "00000000-0000-0000-0000-000000000000";
            var user = new UserWithRoleDto(userId, null, null, null, null, false, new RoleDto(null, null, null), null, null);

            _userServiceMock.Setup(x => x.GetByIdAsync(new Guid(userId))).ReturnsAsync(Result<UserWithRoleDto>.Ok(user));

            // Act
            var result = await _controller.GetById(new Guid(userId));

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var returnedUser = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(user.Id, returnedUser.Id);
        }

        [TestMethod]
        public async Task GetById_ReturnsBadRequestResult_WhenUserServiceFails()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Error message";
            _userServiceMock.Setup(x => x.GetByIdAsync(id)).ReturnsAsync(Result<UserWithRoleDto>.Fail(error));

            // Act
            var result = await _controller.GetById(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod()]
        public async Task Update_Should_Return_OkResult_When_Successful()
        {
            // Arrange
            var userId = "00000000-0000-0000-0000-000000000000";
            var userDto = new UserDto(userId, "john.doe@example.com", "John Doe", null, null, new Guid().ToString());
            var userWithRoleDto = new UserWithRoleDto(userId, "john.doe@example.com", "John Doe", null, null, true, new RoleDto(new Guid().ToString(), null), null, null);

            _userServiceMock.Setup(x => x.UpdateAsync(userDto)).ReturnsAsync(Result<UserWithRoleDto>.Ok(userWithRoleDto));

            // Act
            var result = await _controller.Update(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var updatedUser = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(userDto.Id, updatedUser.Id);
        }

        [TestMethod]
        public async Task Update_ReturnsBadRequestResult_WhenUserServiceFails()
        {
            // Arrange
            var user = new UserDto("00000000-0000-0000-0000-000000000000", null, null, null, null, null);
            var error = "Error message";
            _userServiceMock.Setup(x => x.UpdateAsync(user)).ReturnsAsync(Result<UserWithRoleDto>.Fail(error));

            // Act
            var result = await _controller.Update(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod()]
        public async Task Delete_Should_Return_OkResult_When_Successful()
        {
            // Arrange
            var userId = new Guid("00000000-0000-0000-0000-000000000000");
            var userDto = new UserDto(userId.ToString(), "john.doe@example.com", "John Doe", null, null, new Guid().ToString());

            _userServiceMock.Setup(x => x.DeleteAsync(userId)).ReturnsAsync(Result<UserDto>.Ok(userDto));

            // Act
            var result = await _controller.Delete(userId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task Delete_ReturnsBadRequestResult_WhenUserServiceFails()
        {
            // Arrange
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Error message";
            _userServiceMock.Setup(x => x.DeleteAsync(id)).ReturnsAsync(Result<UserDto>.Fail(error));

            // Act
            var result = await _controller.Delete(id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task GetMyProfile_ShouldReturnOkResult()
        {
            // Arrange
            var user = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            var userProfileDto = new UserProfileDto(user.Email, user.Name, user.Phone, user.Nif);

            _userServiceMock.Setup(x => x.GetMyProfileAsync(new Guid(user.Id))).ReturnsAsync(Result<UserProfileDto>.Ok(userProfileDto));

            // Act
            var result = await _controller.GetMyProfile();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(userProfileDto, (okResult.Value) as UserProfileDto);
        }

        [TestMethod]
        public async Task GetMyProfile_Should_Return_BadRequest_When_Not_Authenticated()
        {
            _controller.ControllerContext.HttpContext.Items["user"] = null; // Set the user in HttpContext.Items

            // Act
            var result = await _controller.GetMyProfile();

            var error = "Not authenticated";

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task GetMyProfile_Should_Return_BadRequest_When_Service_Fails()
        {
            var error = "Error";

            _userServiceMock.Setup(x => x.GetMyProfileAsync(It.IsAny<Guid>())).ReturnsAsync(Result<UserProfileDto>.Fail(error));

            // Act
            var result = await _controller.GetMyProfile();


            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task GetUserAllInfo_ShouldReturnOkResult()
        {
            // Arrange
            var user = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            var userDto = new UserDto(user.Id, user.Email, user.Name, user.Phone, user.Nif, user.Role.Id);
            var taskSimpleDto = new TaskSimpleDto(false, null, null, null);  

            var token = "token";
            var userWithTasks = new UserWithTasks(userDto, new List<TaskSimpleDto>());

            _userServiceMock.Setup(x => x.GetUserAllInfo(new Guid(user.Id), token)).ReturnsAsync(Result<UserWithTasks>.Ok(userWithTasks));

            // Act
            var result = await _controller.GetUserAllInfo();

            //Console.WriteLine((((result.Result) as OkObjectResult).Value as UserWithTasks).user.Email);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(userWithTasks, okResult.Value);
        }

        [TestMethod]
        public async Task GetUserAllInfo_Should_Return_BadRequest_When_Not_Authenticated()
        {

            _controller.ControllerContext.HttpContext.Items["user"] = null; // Set the user in HttpContext.Items

            // Act
            var result = await _controller.GetUserAllInfo();

            var error = "Not authenticated";

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task GetUserAllInfo_Should_Return_BadRequest_When_Service_Fails()
        {
            var error = "Error";

            _userServiceMock.Setup(x => x.GetUserAllInfo(It.IsAny<Guid>(), It.IsAny<string>())).ReturnsAsync(Result<UserWithTasks>.Fail(error));

            // Act
            var result = await _controller.GetUserAllInfo();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task UpdateMyProfile_ShouldReturnOk()
        {
            // Arrange
            var UserWithRoleDto = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
            var user = new UpdateUserProfile("john.doe@example.com", null, "John Doe", null, null);

            var userProfileDto = new UserProfileDto(user.Email, user.Name, user.Phone, user.Nif);

            _userServiceMock.Setup(x => x.UpdateMyProfileAsync(user, UserWithRoleDto.Id)).ReturnsAsync(Result<UserProfileDto>.Ok(userProfileDto));

            // Act
            var result = await _controller.UpdateMyProfile(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(userProfileDto, okResult.Value);
        }

        [TestMethod]
        public async Task UpdateMyProfile_Should_Return_BadRequest_When_Not_Authenticated()
        {

            _controller.ControllerContext.HttpContext.Items["user"] = null; // Set the user in HttpContext.Items

            // Act
            var user = new UpdateUserProfile(null, null, null, null, null);
            
            var result = await _controller.UpdateMyProfile(user);

            var error = "Not authenticated";

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task UpdateMyProfile_Should_Return_BadRequest_When_Service_Fails()
        {
            // Arrange
            var user = new UpdateUserProfile("john.doe@example.com", null, "John Doe", null, null);
            var UserWithRoleDto = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            var error = "Error message";
            _userServiceMock.Setup(x => x.UpdateMyProfileAsync(user, UserWithRoleDto.Id)).ReturnsAsync(Result<UserProfileDto>.Fail(error));

            // Act
            var result = await _controller.UpdateMyProfile(user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task ApproveReject_ShouldReturnOk()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = new IsApprovedDto("true");

            var UserWithRoleDto = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
            var UserDto = new UserDto(UserWithRoleDto.Id, UserWithRoleDto.Email, UserWithRoleDto.Name, UserWithRoleDto.Phone, UserWithRoleDto.Nif, UserWithRoleDto.Role.Id);

            _userServiceMock.Setup(x => x.UpdateIsApprovedAsync(id, user)).ReturnsAsync(Result<UserDto>.Ok(UserDto));

            // Act
            var result = await _controller.ApproveReject(id, user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(UserDto, okResult.Value);
        }

        [TestMethod]
        public async Task ApproveReject_Should_Return_BadRequest_When_Service_Fails()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = new IsApprovedDto("true");

            var error = "Error message";

            _userServiceMock.Setup(x => x.UpdateIsApprovedAsync(id, user)).ReturnsAsync(Result< UserDto>.Fail(error));

            // Act
            var result = await _controller.ApproveReject(id, user);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task DeleteMyProfile_ShouldReturnOk()
        {
            // Arrange
            var user = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);
            var UserDto = new UserDto(user.Id, user.Email, user.Name, user.Phone, user.Nif, user.Role.Id);

            _userServiceMock.Setup(x => x.DeleteIgnoringActiveAsync(Guid.Parse(user.Id))).ReturnsAsync(Result<UserDto>.Ok(UserDto));

            // Act
            var result = await _controller.DeleteMyProfile();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(new { message = "User profile deleted successfully" }.ToString(), okResult.Value.ToString());
            
        }

        [TestMethod]
        public async Task DeleteMyProfile_Should_Return_BadRequest_When_Not_Authenticated()
        {

            _controller.ControllerContext.HttpContext.Items["user"] = null; // Set the user in HttpContext.Items

            // Act
            var result = await _controller.DeleteMyProfile();

            var error = "Not authenticated";

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }

        [TestMethod]
        public async Task DeleteMyProfile_Should_Return_BadRequest_When_Service_Fails()
        {
            var id = new Guid("00000000-0000-0000-0000-000000000000");
            var error = "Error message";
            _userServiceMock.Setup(x => x.DeleteIgnoringActiveAsync(id)).ReturnsAsync(Result<UserDto>.Fail(error));

            // Act
            var result = await _controller.DeleteMyProfile();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(BadRequestObjectResult));
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(new { error = error }.ToString(), badRequestResult.Value.ToString());
        }
    }
}
