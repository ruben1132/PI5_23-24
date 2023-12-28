using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Mpt;
using Mpt.Core.Logic;
using Mpt.Dtos;
using Mpt.IServices;

namespace tests.Integration
{
    [TestClass]
    public class UsersControllerIntegrationTests : IDisposable
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;

        public UsersControllerIntegrationTests()
        {
            _factory = new WebApplicationFactory<Startup>().WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                Startup.ConfigureTestServices(services);
                services.AddScoped<IUserService, MockUserService>();
            });
        });

            // Manually add a cookie to the HttpClient
            var cookie = new CookieHeaderValue("robdronego_authCookie", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImI1Nzk0ZTBjLTA4OTItNDBiMS05MzczLTBhZTY2NTMzMGE1YSIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTcwMzc4NjYxOSwiZXhwIjoxNzA0MzkxNDE5LCJpYXQiOjE3MDM3ODY2MTl9.ZVSZ9dHGRjTLgqKsoL6otd7JvD3VGwW4sRLeLspK9U4");
            var options = new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            };

            _client = _factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    Startup.ConfigureTestServices(services);
                });
            })
            .CreateClient(options);

            _client.DefaultRequestHeaders.Add("Cookie", cookie.ToString());
        }

        public void Dispose()
        {
            _client.Dispose();
            _factory.Dispose();
        }

        [TestMethod]
        public async Task GetAll_WithValidData_ReturnsOk()
        {
            // Act
            var response = await _client.GetAsync("/api/users");

            // Assert
            response.EnsureSuccessStatusCode();
            var users = await response.Content.ReadFromJsonAsync<List<UserWithRoleDto>>();
            Assert.IsNotNull(users);
        }

        [TestMethod]
        public async Task GetAll_WithSysUser_ReturnsOk()
        {

            // Act
            var response = await _client.GetAsync("/api/users?isSysUser=true");

            // Assert
            response.EnsureSuccessStatusCode();
            var users = await response.Content.ReadFromJsonAsync<List<UserWithRoleDto>>();
            Assert.IsNotNull(users);
        }

        [TestMethod]
        public async Task GetAll_WithApproved_ReturnsOk()
        {

            // Act
            var response = await _client.GetAsync("/api/users?isApproved=approved");

            // Assert
            response.EnsureSuccessStatusCode();
            var users = await response.Content.ReadFromJsonAsync<List<UserWithRoleDto>>();
            Assert.IsNotNull(users);
        }

        [TestMethod]
        public async Task Create_ValidUser_ReturnsOk()
        {
            // Arrange
            var newUserDto = new CreateUserDto(
                "test00000000@isep.ipp.pt",
                "Test123!@111",
                "Integration Test User",
                "912345678",
                "123456789",
                "33690e0e-834d-478b-8867-0074c2fec278"
            );

            // Act
            var response = await _client.PostAsJsonAsync("/api/users", newUserDto);

            // Assert
            response.EnsureSuccessStatusCode();
            var createdUser = await response.Content.ReadFromJsonAsync<UserWithRoleDto>();
            Assert.IsNotNull(createdUser);
            Assert.AreEqual(newUserDto.Email, createdUser.Email);
            Assert.AreEqual(newUserDto.Name, createdUser.Name);
            Assert.AreEqual(newUserDto.Phone, createdUser.Phone);
            Assert.AreEqual(newUserDto.Nif, createdUser.Nif);
            Assert.AreEqual(newUserDto.RoleId, createdUser.Role.Id);
        }

        [TestMethod]
        public async Task Create_UserWithInvalidEmail_ReturnsBadRequest()
        {
            // Arrange
            var newUserDto = new CreateUserDto(
                "tt@gmail.com",
                "Test123!@111",
                "Integration Test User",
                "912345678",
                "123456789",
                "33690e0e-834d-478b-8867-0074c2fec278"
            );

            // Act
            var response = await _client.PostAsJsonAsync("/api/users", newUserDto);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [TestMethod]
        public async Task Create_UserWithEmailAlreadyInUse_ReturnsBadRequest()
        {
            // Arrange
            var newUserDto = new CreateUserDto(
                "test@isep.ipp.pt",
                "Test123!@111",
                "Integration Test User",
                "912345678",
                "123456789",
                "33690e0e-834d-478b-8867-0074c2fec278"
            );

            // Act
            var response = await _client.PostAsJsonAsync("/api/users", newUserDto);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }


        [TestMethod]
        public async Task GetById_ValidId_ReturnsOk()
        {
            // Arrange
            var id = new Guid("1be66f50-0ef6-4073-b9e7-0a576b4c32de");

            // Act
            var response = await _client.GetAsync($"/api/users/{id}");

            // Assert
            response.EnsureSuccessStatusCode();
            var user = await response.Content.ReadFromJsonAsync<UserWithRoleDto>();
            Assert.IsNotNull(user);
            Assert.AreEqual(id.ToString(), user.Id);
        }

        [TestMethod]
        public async Task Update_ValidUser_ReturnsOk()
        {
            // Arrange
            var id = new Guid("1be66f50-0ef6-4073-b9e7-0a576b4c32de");
            var updatedUserDto = new UserDto(
                id.ToString(),
                "test2@isep.ipp.pt",
                "Test",
                "912345678",
                "123456789",
                "33690e0e-834d-478b-8867-0074c2fec278",
                true,
                "Pa$$w0rd!!"
            );

            // Act
            var response = await _client.PatchAsJsonAsync($"/api/users/", updatedUserDto);

            // Assert
            response.EnsureSuccessStatusCode();
            var updatedUser = await response.Content.ReadFromJsonAsync<UserWithRoleDto>();
            Assert.IsNotNull(updatedUser);
            Assert.AreEqual(id.ToString(), updatedUser.Id);
        }

        [TestMethod]
        public async Task Update_UserWithInvalidEmail_ReturnsBadRequest()
        {
            // Arrange
            var id = new Guid("1be66f50-0ef6-4073-b9e7-0a576b4c32de");
            var updatedUserDto = new UserDto(
                id.ToString(),
                "jj@gmail.com",
                "Test",
                "912345678",
                "123456789",
                "33690e0e-834d-478b-8867-0074c2fec278",
                true,
                "Pa$$w0rd!!"
            );

            // Act
            var response = await _client.PatchAsJsonAsync($"/api/users/", updatedUserDto);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [TestMethod]
        public async Task Update_UserWithEmailAlreadyInUse_ReturnsBadRequest()
        {
            // Arrange
            var id = new Guid("1be66f50-0ef6-4073-b9e7-0a576b4c32de");
            var updatedUserDto = new UserDto(
                id.ToString(),
                "test@isep.ipp.pt",
                "Test",
                "912345678",
                "123456789",
                "33690e0e-834d-478b-8867-0074c2fec278",
                true,
                "Pa$$w0rd!!"
            );

            // Act
            var response = await _client.PatchAsJsonAsync($"/api/users/", updatedUserDto);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }


        [TestMethod]
        public async Task UpdateIsApproved_ValidUser_ReturnsOk()
        {
            // Arrange
            var id = new Guid("1be66f50-0ef6-4073-b9e7-0a576b4c32de");
            var updatedUserDto = new IsApprovedDto(
                ApprovalStatus.approved.ToString()
            );

            // Act
            var response = await _client.PatchAsJsonAsync($"/api/users/{id}", updatedUserDto);

            // Assert
            response.EnsureSuccessStatusCode();
            var updatedUser = await response.Content.ReadFromJsonAsync<UserDto>();
            Assert.IsNotNull(updatedUser);
            Assert.AreEqual(id.ToString(), updatedUser.Id);
            Assert.AreEqual(ApprovalStatus.approved.ToString(), updatedUserDto.IsApproved);
        }

        [TestMethod]
        public async Task GetMyProfile_ValidId_ReturnsOk()
        {

            // Act
            var response = await _client.GetAsync($"/api/users/profile");

            // Assert
            response.EnsureSuccessStatusCode();
            var profile = await response.Content.ReadFromJsonAsync<UserProfileDto>();
            Assert.IsNotNull(profile);

        }

        [TestMethod]
        public async Task UpdateMyProfile_ValidUser_ReturnsOk()
        {
            // Arrange
            var id = new Guid("1be66f50-0ef6-4073-b9e7-0a576b4c32de");
            var updatedUserDto = new UpdateUserProfile(
                "email@isep.ipp.pt",
                "Test",
                "Pa$$w0rd!!",
                "912345678",
                "123456789"
            );

            // Act
            var response = await _client.PatchAsJsonAsync($"/api/users/profile", updatedUserDto);

            // Assert
            response.EnsureSuccessStatusCode();
            var updatedUser = await response.Content.ReadFromJsonAsync<UserProfileDto>();
            Assert.IsNotNull(updatedUser);
        }


        // MockUserService class
        private class MockUserService : IUserService
        {
            private readonly List<string> _emails = new List<string>() { "test@isep.ipp.pt" };

            public Task<Result<UserWithRoleDto>> AddAsync(CreateUserDto dto)
            {
                // check if email is valid
                if (!dto.Email.Contains("@isep.ipp.pt"))
                {
                    return Task.FromResult(Result<UserWithRoleDto>.Fail("Email must be from isep.ipp.pt"));
                }

                // check if email is already in use
                if (_emails.Contains(dto.Email))
                {
                    return Task.FromResult(Result<UserWithRoleDto>.Fail("Email already in use"));
                }

                var user = new UserWithRoleDto(
                    new Guid().ToString(),
                    dto.Email,
                    dto.Name,
                    dto.Phone,
                    dto.Nif,
                    true,
                    new RoleDto("33690e0e-834d-478b-8867-0074c2fec278", "admin"),
                    ApprovalStatus.pending.ToString(),
                    DateTime.UtcNow.ToString()
                );

                return Task.FromResult(Result<UserWithRoleDto>.Ok(user));
            }

            public Task<Result<UserDto>> DeleteAsync(Guid id)
            {
                return Task.FromResult(Result<UserDto>.Ok(new UserDto(
                    "1be66f50-0ef6-4073-b9e7-0a576b4c32de",
                    "",
                    "",
                    "",
                    "",
                    "",
                    true,
                    ""
                )));
            }

            public Task<Result<UserDto>> DeleteIgnoringActiveAsync(Guid id)
            {
                return Task.FromResult(Result<UserDto>.Ok(new UserDto(
                 "1be66f50-0ef6-4073-b9e7-0a576b4c32de",
                 "",
                 "",
                 "",
                 "",
                 "",
                 true,
                 ""
             )));
            }

            public Task<Result<List<UserWithRoleDto>>> GetAllAsync(bool? isSysUser, string? isApproved)
            {

                var users = new List<UserWithRoleDto>();
                users.Add(new UserWithRoleDto(
                    "1be66f50-0ef6-4073-b9e7-0a576b4c32de",
                    "",
                    "",
                    "",
                    "",
                    true,
                    new RoleDto("33690e0e-834d-478b-8867-0074c2fec278", "admin"),
                    ApprovalStatus.pending.ToString(),
                    DateTime.UtcNow.ToString()
                ));

                return Task.FromResult(Result<List<UserWithRoleDto>>.Ok(users));
            }

            public Task<Result<UserWithRoleDto>> GetByIdAsync(Guid id)
            {
                return Task.FromResult(Result<UserWithRoleDto>.Ok(new UserWithRoleDto(
                    "1be66f50-0ef6-4073-b9e7-0a576b4c32de",
                    "",
                    "",
                    "",
                    "",
                    true,
                    new RoleDto("33690e0e-834d-478b-8867-0074c2fec278", "admin"),
                    ApprovalStatus.pending.ToString(),
                    DateTime.UtcNow.ToString()
                )));
            }

            public Task<Result<UserProfileDto>> GetMyProfileAsync(Guid id)
            {
                return Task.FromResult(Result<UserProfileDto>.Ok(new UserProfileDto(
                    "test@isep.ipp.pt",
                    "Test",
                    "912345678",
                    "123456789"
                )));
            }

            public Task<Result<UserWithTasks>> GetUserAllInfo(Guid id, string token)
            {
                var user = new UserWithTasks(
                    new UserDto(
                        "1be66f50-0ef6-4073-b9e7-0a576b4c32de",
                        "",
                        "",
                        "",
                        "",
                        "",
                        true,
                        ""
                    ),
                    new List<TaskSimpleDto>()
                );

                return Task.FromResult(Result<UserWithTasks>.Ok(user));
            }

            public Task<Result<UserWithRoleDto>> UpdateAsync(UserDto dto)
            {
                // check if email is valid
                if (!dto.Email.Contains("@isep.ipp.pt"))
                {
                    return Task.FromResult(Result<UserWithRoleDto>.Fail("Email must be from isep.ipp.pt"));
                }

                // check if email is already in use
                if (_emails.Contains(dto.Email))
                {
                    return Task.FromResult(Result<UserWithRoleDto>.Fail("Email already in use"));
                }

                return Task.FromResult(Result<UserWithRoleDto>.Ok(new UserWithRoleDto(
                    "1be66f50-0ef6-4073-b9e7-0a576b4c32de",
                    "",
                    "",
                    "",
                    "",
                    true,
                    new RoleDto("33690e0e-834d-478b-8867-0074c2fec278", "admin"),
                    ApprovalStatus.pending.ToString(),
                    DateTime.UtcNow.ToString()
                )));
            }

            public Task<Result<UserDto>> UpdateIsApprovedAsync(Guid id, IsApprovedDto dto)
            {
                return Task.FromResult(Result<UserDto>.Ok(new UserDto(
                    "1be66f50-0ef6-4073-b9e7-0a576b4c32de",
                    "",
                    "",
                    "",
                    "",
                    "",
                    true,
                    ""
                )));
            }

            public Task<Result<UserProfileDto>> UpdateMyProfileAsync(UpdateUserProfile dto, string userId)
            {
                // check if email is valid
                if (!dto.Email.Contains("@isep.ipp.pt"))
                {
                    return Task.FromResult(Result<UserProfileDto>.Fail("Email must be from isep.ipp.pt"));
                }

                return Task.FromResult(Result<UserProfileDto>.Ok(new UserProfileDto(
                    "",
                    "",
                    "",
                    ""
                )));
            }


        }

    }
}
