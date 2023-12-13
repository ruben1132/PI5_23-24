


using Mpt.Domain.Roles;
using Mpt.Dtos;

namespace Mpt.Mappers
{
    public class RoleMapper
    {
        public static RoleDto ToDto(Role role)
        {
            return new RoleDto(
                    role.Id.Value,
                    role.Name,
                    role.Active
                );
        }

        public static Role ToDomain(CreateRoleDto dto)
        {
            return new Role(dto.Name);
        }
    }
}
