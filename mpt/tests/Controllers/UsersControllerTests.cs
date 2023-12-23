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

namespace tests.Controllers.Tests
{
    [TestClass()]
    public class UsersControllerTests
    {
        private Mock<IUserService> _userServiceMock;
        private UsersController _usersController;

        [TestInitialize]
        public void Setup()
        {
            _userServiceMock = new Mock<IUserService>();
            _usersController = new UsersController(_userServiceMock.Object);


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
            var result = await _usersController.Create(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var createdUser = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(userDto.Email, createdUser.Email);
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
            var result = await _usersController.GetAll(isSysUser, isApproved);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(IEnumerable<UserWithRoleDto>));
            var userList = okResult.Value as IEnumerable<UserWithRoleDto>;
            Assert.AreEqual(users.Count, userList.Count());
        }


        [TestMethod()]
        public async Task GetById_Should_Return_OkResult_With_User()
        {
            // Arrange
            string userId = "00000000-0000-0000-0000-000000000000";
            var user = new UserWithRoleDto(userId, null, null, null, null, false, new RoleDto(null, null, null), null, null);

            _userServiceMock.Setup(x => x.GetByIdAsync(new Guid(userId))).ReturnsAsync(Result<UserWithRoleDto>.Ok(user));

            // Act
            var result = await _usersController.GetById(new Guid(userId));

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var returnedUser = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(user.Id, returnedUser.Id);
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
            var result = await _usersController.Update(userDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult.Value);
            Assert.IsInstanceOfType(okResult.Value, typeof(UserWithRoleDto));
            var updatedUser = okResult.Value as UserWithRoleDto;
            Assert.AreEqual(userDto.Id, updatedUser.Id);
        }

        [TestMethod()]
        public async Task Delete_Should_Return_OkResult_When_Successful()
        {
            // Arrange
            var userId = new Guid("00000000-0000-0000-0000-000000000000");
            var userDto = new UserDto(userId.ToString(), "john.doe@example.com", "John Doe", null, null, new Guid().ToString());

            _userServiceMock.Setup(x => x.DeleteAsync(userId)).ReturnsAsync(Result<UserDto>.Ok(userDto));

            // Act
            var result = await _usersController.Delete(userId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
        }



        [TestMethod]
        public async Task GetMyProfile_ShouldReturnOkResult()
        {
            // Arrange
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            // Set HttpContext user item
            _usersController.ControllerContext.HttpContext = new DefaultHttpContext();
            _usersController.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the user in HttpContext.Items

            _userServiceMock.Setup(x => x.GetByIdAsync(new Guid(currentUser.Id))).ReturnsAsync(Result<UserWithRoleDto>.Ok(currentUser));

            // Act
            var result = await _usersController.GetMyProfile();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(currentUser, (okResult.Value) as UserWithRoleDto);
        }


        [TestMethod]
        public async Task GetUserAllInfo_ShouldReturnOkResult()
        {
            // Arrange
            var currentUser = new UserWithRoleDto("00000000-0000-0000-0000-000000000000", "john.doe@example.com", "John Doe", null, null, true, new RoleDto("roleId", null), null, null);

            // Set HttpContext user item
            _usersController.ControllerContext.HttpContext = new DefaultHttpContext();
            _usersController.ControllerContext.HttpContext.Items["user"] = currentUser; // Set the user in HttpContext.Items

            // Set authorization header for testing purposes
            _usersController.Request.Headers["Authorization"] = "Bearer token"; // Replace with your test token


            var userDto = new UserDto(currentUser.Id, currentUser.Email, currentUser.Name, currentUser.Phone, currentUser.Nif, currentUser.Role.Id);
            var taskSimpleDto = new TaskSimpleDto(false, null, null, null);  

            var token = "token";
            var userWithTasks = new UserWithTasks(userDto, new List<TaskSimpleDto>());

            _userServiceMock.Setup(x => x.GetUserAllInfo(new Guid(currentUser.Id), token)).ReturnsAsync(Result<UserWithTasks>.Ok(userWithTasks));

            // Act
            var result = await _usersController.GetUserAllInfo();

            Console.WriteLine((((result.Result) as OkObjectResult).Value as UserWithTasks).user.Email);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(userWithTasks, okResult.Value);
        }



    }
}
