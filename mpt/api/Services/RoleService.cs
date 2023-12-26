using Mpt.Domain.Shared;
using Mpt.Domain.Roles;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.IServices;
using Mpt.Core.Domain;
using Mpt.Core.Logic;

namespace Mpt.Services
{
    public class RoleService : IRoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoleRepository _repo;

        public RoleService(IUnitOfWork unitOfWork, IRoleRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<Result<List<RoleDto>>> GetAllAsync(bool? isSysRole)
        {
            try
            {
                var roles = await this._repo.GetAllFilteredAsync(isSysRole);
                if (roles == null)
                    return Result<List<RoleDto>>.Ok(new List<RoleDto>());

                var rolesDto = new List<RoleDto>();
                foreach (var role in roles)
                {
                    rolesDto.Add(RoleMapper.ToDto(role));
                }

                return Result<List<RoleDto>>.Ok(rolesDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<List<RoleDto>>.Fail(ex.Message);
            }
        }

        public async Task<Result<RoleDto>> GetByIdAsync(Guid id)
        {
            try
            {
                var role = await this._repo.GetByIdAsync(new RoleId(id));

                if (role == null)
                    return Result<RoleDto>.Fail("Role not found.");

                var roleDto = RoleMapper.ToDto(role);

                return Result<RoleDto>.Ok(roleDto);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<RoleDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<RoleDto>> AddAsync(CreateRoleDto dto)
        {
            try
            {
                var role = new Role(dto.Name);

                await this._repo.AddAsync(role);
                await this._unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                return Result<RoleDto>.Ok(roleDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<RoleDto>.Fail(ex.Message);
            }

        }

        public async Task<Result<RoleDto>> UpdateAsync(RoleDto dto)
        {
            try
            {
                var role = await this._repo.GetByIdAsync(new RoleId(dto.Id));

                if (role == null)
                    return Result<RoleDto>.Fail("Role not found.");

                if (dto.IsActive == true)
                {
                    role.Enable();
                    role.ChangeName(dto.Name);
                }
                else
                    role.Disable();


                await this._unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                return Result<RoleDto>.Ok(roleDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<RoleDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<RoleDto>> DeleteAsync(Guid id)
        {
            try
            {
                var role = await this._repo.GetByIdAsync(new RoleId(id));

                if (role == null)
                    return Result<RoleDto>.Fail("Role not found.");

                if (role.Active)
                    return Result<RoleDto>.Fail("You cannot delete a Role that is active.");

                this._repo.Remove(role);
                await this._unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                return Result<RoleDto>.Ok(roleDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<RoleDto>.Fail(ex.Message);
            }
        }
    }
}