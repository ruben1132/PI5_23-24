using Mpt.Domain.Shared;
using Mpt.Domain.Roles;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.IServices;

namespace Mpt.Services
{
    public class RoleService : IRoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoleRepository _repo;

        public RoleService(IUnitOfWork unitOfWork, IRoleRepository repo, IRoleRepository roleRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<RoleDto>> GetAllAsync()
        {
            try
            {
                var roles = await this._repo.GetAllAsync();

                var rolesDto = new List<RoleDto>();

                foreach (var role in roles)
                {
                    rolesDto.Add(RoleMapper.ToDto(role));
                }

                return rolesDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<RoleDto> GetByIdAsync(RoleId id)
        {
            try
            {
                var role = await this._repo.GetByIdAsync(id);

                if (role == null)
                    return null;

                return RoleMapper.ToDto(role);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<RoleDto> AddAsync(CreateRoleDto dto)
        {
            try
            {
                var role = new Role(dto.Name);

                await this._repo.AddAsync(role);
                await this._unitOfWork.CommitAsync();

                return RoleMapper.ToDto(role);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }

        public async Task<RoleDto> UpdateAsync(RoleDto dto)
        {
            try
            {
                var role = await this._repo.GetByIdAsync(new RoleId(dto.Id));

                if (role == null)
                    return null;

                role.ChangeName(dto.Name);

                await this._unitOfWork.CommitAsync();

                return RoleMapper.ToDto(role);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }


        public async Task<RoleDto> DeleteAsync(RoleId id)
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

                return RoleMapper.ToDto(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}