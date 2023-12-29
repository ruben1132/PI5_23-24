
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
    public class TasksControllerIntegrationTests : IDisposable
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;

        public TasksControllerIntegrationTests()
        {
            _factory = new WebApplicationFactory<Startup>().WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(services =>
            {
                Startup.ConfigureTestServices(services);
                services.AddScoped<ITaskService, MockTaskService>();
            });
        });

            // Manually add a cookie to the HttpClient
            var cookie = new CookieHeaderValue("robdronego_authCookie", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIxNmNkZGNkLTI1MTEtNDRkYy1iMzQ5LTFhNjI4YWZjODRmMCIsInJvbGUiOiJnZXN0b3IgdGFyZWZhcyIsIm5iZiI6MTcwMzgwMTkxMiwiZXhwIjoxNzA0NDA2NzEyLCJpYXQiOjE3MDM4MDE5MTJ9.lhhp1ctzul8biSaO75PiczysA7Mgl5fVPQFMBYHJdoY");
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
        public async Task AddSurveillanceTaskAsync_ShouldReturnOk()
        {
            // Arrange
            var dto = new CreateSurveillanceTaskDto(
                "912345678",
                "areallyreallydopefloorid"
            );

            // Act
            var response = await _client.PostAsJsonAsync("/api/tasks/surveillance", dto);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task AddPickupDeliveryTaskAsync_ShouldReturnOk()
        {
            // Arrange
            var dto = new CreatePickupDeliveryTaskDto(
                "John Doe",
                "912345678",
                "Jane Doe",
                "912345678",
                "A really really dope task",
                "room",
                "roomid1",
                "room",
                "roomid2",
                "sala(a100)",
                "sala(a200)"
            );

            // Act
            var response = await _client.PostAsJsonAsync("/api/tasks/pickupdelivery", dto);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task GetByIdAsync_ShouldReturnOk()
        {
            // Arrange
            var id = "00000000-0000-0000-0000-000000000000";

            // Act
            var response = await _client.GetAsync($"/api/tasks/{id}");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [TestMethod]
        public async Task ApproveTaskAsync_ShouldReturnOk()
        {
            // Arrange
            var id = "00000000-0000-0000-0000-000000000000";
            var dto = new IsApprovedDto(ApprovalStatus.approved.ToString());

            // Act
            var response = await _client.PatchAsJsonAsync($"/api/tasks/{id}", dto);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual("approved", dto.IsApproved);
        }

        [TestMethod]
        public async Task RejectTaskAsync_ShouldReturnOk()
        {
            // Arrange
            var id = "00000000-0000-0000-0000-000000000000";
            var dto = new IsApprovedDto(ApprovalStatus.rejected.ToString());

            // Act
            var response = await _client.PatchAsJsonAsync($"/api/tasks/{id}", dto);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual("rejected", dto.IsApproved);
        }

        [TestMethod]
        public async Task GetAllAsync_ShouldReturnOk()
        {

            // Act
            var response = await _client.GetAsync($"/api/tasks");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(response.Content);
        }

        [TestMethod]
        public async Task GetAllAsync_Pending_ShouldReturnOk()
        {
            // Arrange
            var isApproved = "pending";

            // Act
            var response = await _client.GetAsync($"/api/tasks?isApproved={isApproved}");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(response.Content);
        }

        [TestMethod]
        public async Task GetAllAsync_Approved_ShouldReturnOk()
        {
            // Arrange
            var isApproved = "approved";

            // Act
            var response = await _client.GetAsync($"/api/tasks?isApproved={isApproved}");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(response.Content);
        }

        [TestMethod]
        public async Task GetAllAsync_Rejected_ShouldReturnOk()
        {
            // Arrange
            var isApproved = "rejected";

            // Act
            var response = await _client.GetAsync($"/api/tasks?isApproved={isApproved}");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(response.Content);
        }

        [TestMethod]
        public async Task GetAllAsync_Surveillance_ShouldReturnOk()
        {
            // Arrange
            var type = "surveillance";

            // Act
            var response = await _client.GetAsync($"/api/tasks?type={type}");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(response.Content);
        }

        [TestMethod]
        public async Task GetAllAsync_PickupDelivery_ShouldReturnOk()
        {
            // Arrange
            var type = "pickupdelivery";

            // Act
            var response = await _client.GetAsync($"/api/tasks?type={type}");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(response.Content);
        }

        [TestMethod]
        public async Task GetMyTasksAsync_ShouldReturnOk()
        {
            // Act
            var response = await _client.GetAsync($"/api/tasks/my");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.IsNotNull(response.Content);
        }


        // MockTaskService class
        private class MockTaskService : ITaskService
        {

            public Task<Result<SurveillanceTaskSimpleDto>> AddSurveillanceTaskAsync(CreateSurveillanceTaskDto dto, string userId, string token)
            {

                var task = new SurveillanceTaskSimpleDto
                (
                    false,
                    "Surveillance",
                    dto.PhoneNumber,
                    "a1",
                    ApprovalStatus.pending.ToString(),
                    DateTime.Now.ToString()
                );

                return Task.FromResult(Result<SurveillanceTaskSimpleDto>.Ok(task));
            }

            public Task<Result<PickupDeliveryTaskSimpleDto>> AddPickupDeliveryTaskAsync(CreatePickupDeliveryTaskDto dto, string userId)
            {
                var task = new PickupDeliveryTaskSimpleDto
                (
                  false,
                  "PickupDelivery",
                    dto.PickupPersonName,
                    dto.PickupPersonPhoneNumber,
                    dto.DeliveryPersonName,
                    dto.DeliveryPersonPhoneNumber,
                    dto.TaskDescription,
                    "0000",
                    dto.OriginType,
                    dto.Origin,
                    dto.DestinyType,
                    dto.Destiny,
                    ApprovalStatus.pending.ToString(),
                    DateTime.Now.ToString()
                );

                return Task.FromResult(Result<PickupDeliveryTaskSimpleDto>.Ok(task));
            }

            public Task<Result<TaskDto>> GetByIdAsync(Guid id)
            {

                var task = new TaskDto
                (
                    Guid.NewGuid().ToString(),
                    new List<string> { "1", "2", "3" },
                    false,
                    "PickupDelivery",
                    new UserTaskInfoDto("", "", ""),
                    ApprovalStatus.pending.ToString(),
                    DateTime.Now.ToString(),
                    new List<List<RobotMovementDto>> { new List<RobotMovementDto> { new RobotMovementDto(1, 1) } }
                );

                return Task.FromResult(Result<TaskDto>.Ok(task));
            }

            public Task<Result<List<TaskDto>>> GetAllAsync(string token, string? type, string? userId, string? isApproved)
            {

                var tasks = new List<TaskDto>
                {
                    new TaskDto
                    (
                        Guid.NewGuid().ToString(),
                        new List<string> { "1", "2", "3" },
                        false,
                        "PickupDelivery",
                        new UserTaskInfoDto("utente@isep.ipp.pt", "User 1", "912345678"),
                        ApprovalStatus.pending.ToString(),
                        DateTime.Now.ToString(),
                        new List<List<RobotMovementDto>> { new List<RobotMovementDto> { new RobotMovementDto(1, 1) } }
                    )
                };

                return Task.FromResult(Result<List<TaskDto>>.Ok(tasks));

            }

            public Task<Result<List<TaskSimpleDto>>> GetMyTasksAsync(string token, string? type, string? userId, string? isApproved)
            {

                var tasks = new List<TaskSimpleDto>
                {
                    new TaskSimpleDto
                    (
                        false,
                        "PickupDelivery",
                        ApprovalStatus.pending.ToString(),
                        DateTime.Now.ToString()
                    )
                };

                return Task.FromResult(Result<List<TaskSimpleDto>>.Ok(tasks));
            }

            public Task<Result<TaskSimpleDto>> UpdateIsApprovedAsync(Guid id, IsApprovedDto isApproved)
            {
                var task = new TaskSimpleDto
                (
                    false,
                    "PickupDelivery",
                    isApproved.IsApproved,
                    DateTime.Now.ToString()
                );

                return Task.FromResult(Result<TaskSimpleDto>.Ok(task));
            }

            public Task<Result<string>> DeleteAsync(Guid id)
            {
                return Task.FromResult(Result<string>.Ok("Task deleted successfully"));
            }
        }

    }
}
