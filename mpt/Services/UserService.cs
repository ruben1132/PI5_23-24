using Mpt.Domain.Shared;
using Mpt.Domain.Roles;
using Domain.Users;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.Domain.Users;
using Mpt.IServices;
using Mpt.Core.Domain;
using Mpt.Core.Logic;
using Mpt.Domain.Tasks;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

namespace Mpt.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;
        private readonly IRoleRepository _roleRepo;
        private readonly ITaskRepository _taskRepo;
        private readonly string _emailDomain;

        public UserService(IConfiguration config, IUnitOfWork unitOfWork, IUserRepository repo, IRoleRepository roleRepo, ITaskRepository taskRepo)
        {
            this._config = config;
            var emailDomain = _config.GetValue<string>("EmailDomain") ?? "isep.ipp.pt";
            this._emailDomain = emailDomain;

            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._roleRepo = roleRepo;
            this._taskRepo = taskRepo;
        }

        public async Task<Result<List<UserWithRoleDto>>> GetAllAsync(bool? isSysUser, string? isApproved = null)
        {
            try
            {
                // parse string to enum
                ApprovalStatus? parsedApproved = null;
                if (isApproved != null)
                {
                    isApproved = isApproved.ToLower();
                    parsedApproved = (ApprovalStatus)Enum.Parse(typeof(ApprovalStatus), isApproved, true);
                }

                var users = await this._repo.GetAllFilteredAsync(isSysUser ?? true, parsedApproved);

                if (users == null)
                    return Result<List<UserWithRoleDto>>.Ok(new List<UserWithRoleDto>());

                var usersDto = new List<UserWithRoleDto>();
                foreach (var user in users)
                {
                    var role = await this._roleRepo.GetByIdAsync(user.RoleId);
                    var roleDto = RoleMapper.ToDto(role);
                    usersDto.Add(UserMapper.ToDto(user, roleDto));
                }

                return Result<List<UserWithRoleDto>>.Ok(usersDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<UserWithRoleDto>>.Fail(ex.Message);
            }
        }



        public async Task<Result<List<UserWithTasks>>> GetUserAllInfo(Guid id, string token)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(id));

                if (user == null)
                    return Result<List<UserWithTasks>>.Fail("User not found.");

                var userDto = UserMapper.ToDto(user);

                var tasks = await this._taskRepo.GetAllFilteredAsync(null, userDto.Id, null);

                var tasksDto = await MapTasksToSimpleDto(tasks, token);

                var userwithtasks = UserMapper.ToUserWithTasksDto(userDto, tasksDto);

                return Result<List<UserWithTasks>>.Ok(new List<UserWithTasks>() { userwithtasks });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<UserWithTasks>>.Fail(ex.Message);
            }
        }

        public async Task<Result<UserWithRoleDto>> GetByIdAsync(Guid id)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(id));

                if (user == null)
                    return Result<UserWithRoleDto>.Fail("User not found.");

                var role = await this._roleRepo.GetByIdAsync(user.RoleId);

                var roleDto = RoleMapper.ToDto(role);
                var userDto = UserMapper.ToDto(user, roleDto);
                return Result<UserWithRoleDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<Result<UserProfileDto>> GetMyProfileAsync(Guid id)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(id));

                if (user == null)
                    return Result<UserProfileDto>.Fail("User not found.");

                var role = await this._roleRepo.GetByIdAsync(user.RoleId);

                var userDto = UserMapper.ToProfileDto(user);
                return Result<UserProfileDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<Result<UserWithRoleDto>> AddAsync(CreateUserDto u)
        {
            try
            {
                // check if email already exists
                var userByEmail = await this._repo.GetByEmailAsync(u.Email);

                if (userByEmail != null)
                    return Result<UserWithRoleDto>.Fail("Email already exists.");

                // validate email
                var email = new UserEmail(u.Email, _emailDomain);

                var role = await this._roleRepo.GetByIdAsync(new RoleId(u.RoleId));
                if (role == null)
                    return Result<UserWithRoleDto>.Fail("Role not found.");

                if (role.Active == false)
                    return Result<UserWithRoleDto>.Fail("You are trying to create a user with an inactive role.");


                var roleDto = RoleMapper.ToDto(role);

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(u.Password, BCrypt.Net.BCrypt.GenerateSalt());
                u.Password = hashedPassword;

                var user = UserMapper.ToDomain(u);

                await this._repo.AddAsync(user);
                await this._unitOfWork.CommitAsync();

                var userDto = UserMapper.ToDto(user, roleDto);
                return Result<UserWithRoleDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserWithRoleDto>.Fail(ex.Message);
            }

        }

        public async Task<Result<UserWithRoleDto>> UpdateAsync(UserDto u)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(u.Id));
                var role = await this._roleRepo.GetByIdAsync(new RoleId(u.RoleId));

                if (user == null)
                    return Result<UserWithRoleDto>.Fail("User not found.");

                if (role == null)
                    return Result<UserWithRoleDto>.Fail("Role not found.");

                if (role.Active == false)
                    return Result<UserWithRoleDto>.Fail("You are trying to create a user with an inactive role.");

                if (u.Active == null || u.Active == true)
                {
                    user.Enable();
                    user.ChangeNif(new UserNif(u.Nif));

                    // check if email already exists
                    var userByEmail = await this._repo.GetByEmailAsync(u.Email);
                    if (userByEmail != null && userByEmail.Id != user.Id)
                        return Result<UserWithRoleDto>.Fail("Email already exists.");


                    user.ChangeEmail(new UserEmail(u.Email, _emailDomain));
                    user.ChangeRole(new RoleId(u.RoleId));
                    user.ChangeName(u.Name);

                    // only change password if it is not null
                    if (u.Password != null)
                    {
                        var password = new UserPassword(u.Password, true);  // validates password - throws exception if invalid
                        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password.Value, BCrypt.Net.BCrypt.GenerateSalt());
                        user.ChangePassword(new UserPassword(hashedPassword, false));
                    }

                }
                else
                    user.Disable();


                await this._unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                roleDto.IsActive = null;  // hide
                var userDto = UserMapper.ToDto(user, roleDto);
                return Result<UserWithRoleDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserWithRoleDto>.Fail(ex.Message);
            }
        }


        public async Task<Result<UserProfileDto>> UpdateMyProfileAsync(UpdateUserProfile dto, string userId)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(userId));

                if (user == null)
                    return Result<UserProfileDto>.Fail("User not found.");

                // only updates values if user is active 
                if (user.Active != true)
                    return Result<UserProfileDto>.Fail("You are trying to update a disabled user.");

                user.ChangeNif(new UserNif(dto.Nif));

                // check if email already exists
                var userByEmail = await this._repo.GetByEmailAsync(dto.Email);

                if (userByEmail != null && userByEmail.Id != user.Id)
                    return Result<UserProfileDto>.Fail("Email already exists.");

                user.ChangeEmail(new UserEmail(dto.Email, _emailDomain));
                user.ChangeName(dto.Name);
                user.ChangeNif(new UserNif(dto.Nif));
                user.ChangePhone(new PhoneNumber(dto.Phone));

                // only change password if it is not null
                if (dto.Password != null)
                {
                    var password = new UserPassword(dto.Password, true);  // validates password - throws exception if invalid
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password.Value, BCrypt.Net.BCrypt.GenerateSalt());
                    user.ChangePassword(new UserPassword(hashedPassword, false));
                }

                await this._unitOfWork.CommitAsync();

                var userDto = UserMapper.ToProfileDto(user);

                return Result<UserProfileDto>.Ok(userDto);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserProfileDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<UserDto>> UpdateIsApprovedAsync(Guid id, IsApprovedDto u)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(id));

                if (user == null)
                    return Result<UserDto>.Fail("User not found.");

                if (u.IsApproved == ApprovalStatus.approved.ToString())
                    user.Approve();
                else
                    user.Disapprove();

                user.UpdateLastUpdated();

                await this._unitOfWork.CommitAsync();

                var userDto = UserMapper.ToDto(user);
                userDto.Password = null; // hide
                return Result<UserDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserDto>.Fail(ex.Message);
            }
        }


        public async Task<Result<UserDto>> DeleteAsync(Guid id)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(id));

                if (user == null)
                    return Result<UserDto>.Fail("User not found.");

                if (user.Active)
                    throw new BusinessRuleValidationException("It is not possible to delete an active user.");

                this._repo.Remove(user);
                await this._unitOfWork.CommitAsync();

                var userDto = UserMapper.ToDto(user);
                userDto.Password = null;

                return Result<UserDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<UserDto>> DeleteIgnoringActiveAsync(Guid id)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(id));

                if (user == null)
                    return Result<UserDto>.Fail("User not found.");

                this._repo.Remove(user);
                await this._unitOfWork.CommitAsync();

                var userDto = UserMapper.ToDto(user);
                userDto.Password = null;

                return Result<UserDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserDto>.Fail(ex.Message);
            }
        }


        private async Task<List<TaskSimpleDto>> MapTasksToSimpleDto(IEnumerable<Domain.Tasks.Task> tasks, string token)
        {
            var tasksDto = new List<TaskSimpleDto>();

            foreach (var task in tasks)
            {
                if (task is SurveillanceTask surveillanceTask)
                {
                    // get floor info
                    var floorInfo = await this.GetFloorInfoAsync(surveillanceTask.FloorId, token);
                    tasksDto.Add(TaskMapper.ToDto(surveillanceTask, floorInfo.GetValue()));
                }
                else if (task is PickupDeliveryTask pickupDeliveryTask)
                {
                    tasksDto.Add(TaskMapper.ToDto(pickupDeliveryTask));
                }
            }

            return tasksDto;
        }

        private async Task<Result<string>> GetFloorInfoAsync(string floorId, string token)
        {
            try
            {
                // Create HttpClientHandler with withCredentials set to true
                var handler = new HttpClientHandler
                {
                    UseCookies = true,
                    UseDefaultCredentials = true,
                    AllowAutoRedirect = true,
                };

                // new http client cuz i need to set the handler
                using var httpClient = new HttpClient(handler);
                // call MGI API
                var route = this._config.GetValue<string>("MGIApiUrl:floor") ?? "http://localhost:2225/api/floors/";
                httpClient.BaseAddress = new Uri(route);

                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                // httpClient.DefaultRequestHeaders.Add("withCredentials", "true");

                var response = await httpClient.GetAsync($"{floorId}");

                if (!response.IsSuccessStatusCode)
                    return Result<string>.Ok("unavailable");

                var floor = await response.Content.ReadFromJsonAsync<FloorInfoDto>();

                return Result<string>.Ok(floor.Code);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<string>.Fail(ex.Message);
            }
        }

    }
}