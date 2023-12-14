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

namespace Mpt.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;
        private readonly IRoleRepository _roleRepo;
        private readonly string _emailDomain;

        public UserService(IConfiguration config, IUnitOfWork unitOfWork, IUserRepository repo, IRoleRepository roleRepo)
        {
            this._config = config;
            var emailDomain = _config.GetValue<string>("EmailDomain") ?? "isep.ipp.pt";
            this._emailDomain = emailDomain;

            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._roleRepo = roleRepo;
        }

        public async Task<Result<List<UserWithRoleDto>>> GetAllAsync(bool? isSysUser, bool? isApproved, bool? all)
        {
            try
            {
                // if it wants sysusers, then isApproved is true
                if (isSysUser == true)
                    isApproved = true;

                var users = await this._repo.GetAllFilteredAsync(isSysUser ?? true, isApproved, all ?? false);

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

                // only updates values if user is active (null value means it's a patch request from the utente)
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

        public async Task<Result<UserDto>> UpdateIsApprovedAsync(Guid id, UserIsApprovedDto u)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(id));
                
                if (user == null)
                    return Result<UserDto>.Fail("User not found.");
                
                if (u.IsApproved)
                    user.Approve();
                else
                    user.Disapprove();

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
    }
}