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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;
        private readonly IRoleRepository _roleRepo;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo, IRoleRepository roleRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._roleRepo = roleRepo;
        }

        public async Task<Result<List<UserWithRoleDto>>> GetAllAsync()
        {
            try
            {
                var users = await this._repo.GetAllAsync();

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

                user.ChangeNif(new UserNif(u.Nif));
                user.ChangeEmail(new UserEmail(u.Email));
                user.ChangePassword(new UserPassword(u.Password, true));
                user.ChangeRole(new RoleId(u.RoleId));
                user.ChangeName(u.Name);

                if (u.Active)
                    user.Enable();
                else
                    user.Disable();


                await this._unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                var userDto = UserMapper.ToDto(user, roleDto);
                return Result<UserWithRoleDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserWithRoleDto>.Fail(ex.Message);
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