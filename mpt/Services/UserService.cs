using Mpt.Domain.Shared;
using Mpt.Domain.Roles;
using Domain.Users;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.Domain.Users;
using Mpt.IServices;

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

        public async Task<List<UserWithRoleDto>> GetAllAsync()
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

                return usersDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<UserWithRoleDto> GetByIdAsync(UserId id)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(id);

                if (user == null)
                    return null;

                var role = await this._roleRepo.GetByIdAsync(user.RoleId);

                var roleDto = RoleMapper.ToDto(role);
                return UserMapper.ToDto(user, roleDto);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<UserWithRoleDto> AddAsync(CreateUserDto dto)
        {
            try
            {
                // get utente role
                var role = await this._roleRepo.GetByNameAsync("Utente");
                var user = UserMapper.ToDomain(dto);

                await this._repo.AddAsync(user);

                await this._unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                return UserMapper.ToDto(user, roleDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }

        public async Task<UserWithRoleDto> UpdateAsync(UserDto dto)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(new UserId(dto.Id));
                var role = await this._roleRepo.GetByIdAsync(new RoleId(dto.RoleId));

                if (user == null)
                    return null;

                user.ChangeNif(new UserNif(dto.Nif));
                user.ChangeEmail(new UserEmail(dto.Email));
                user.ChangePassword(new UserPassword(dto.Password));
                user.ChangeRole(new RoleId(dto.RoleId));
                user.ChangeName(dto.Name);

                if (dto.Active)
                    user.Enable();
                else
                    user.Disable();


                await this._unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                return UserMapper.ToDto(user, roleDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }


        public async Task<UserDto> DeleteAsync(UserId id)
        {
            try
            {
                var user = await this._repo.GetByIdAsync(id);

                if (user == null)
                    return null;

                if (user.Active)
                    throw new BusinessRuleValidationException("It is not possible to delete an active user.");

                this._repo.Remove(user);
                await this._unitOfWork.CommitAsync();

                return UserMapper.ToDto(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}