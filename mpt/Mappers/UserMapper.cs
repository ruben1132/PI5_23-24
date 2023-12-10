


using Domain.Users;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.Mappers
{
    public class UserMapper
    {
        public static UserDto ToDto(User user)
        {
            return new UserDto(
                    user.Id.Value,
                    user.Email.Value,
                    user.Name,
                    user.Phone.Value,
                    user.Nif.Value,
                    user.Active,
                    user.RoleId.Value,
                    user.Password.Value
                );
        }

        public static UserWithRoleDto ToDto(User user, RoleDto role)
        {
            return new UserWithRoleDto(
                    user.Id.Value,
                    user.Email.Value,
                    user.Name,
                    user.Phone.Value,
                    user.Nif.Value,
                    user.Active,
                    role,
                    user.IsApproved
                );
        }

        public static UserAuthDto ToDtoAuth(User user, RoleDto role)
        {
            return new UserAuthDto(
                    user.Id.Value,
                    user.Email.Value,
                    user.Name,
                    role
                );
        }

        public static User ToDomain(CreateUserDto dto)
        {
            return new User(
                    new UserEmail(dto.Email),
                    dto.Name,
                    new PhoneNumber(dto.Phone),
                    new UserNif(dto.Nif),
                    new RoleId(dto.RoleId),
                    new UserPassword(dto.Password, true)
                );
        }

        public static User ToDomain(SignupUserDto dto, RoleId roleId)
        {
            return new User(
                    new UserEmail(dto.Email),
                    dto.Name,
                    new PhoneNumber(dto.Phone),
                    new UserNif(dto.Nif),
                    roleId,
                    new UserPassword(dto.Password, true)
                );
        }
    }
}
