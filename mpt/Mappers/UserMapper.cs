


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
                    user.RoleId.Value,
                    user.Active,
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
                    user.IsApproved.ToString()
                );
        }

        public static UserProfileDto ToProfileDto(User user)
        {
            return new UserProfileDto(
                    user.Email.Value,
                    user.Name,
                    user.Phone.Value,
                    user.Nif.Value
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

        public static UserTaskInfoDto ToDtoTaskInfo(User user){
            return new UserTaskInfoDto(
                    user.Email.Value,
                    user.Name,
                    user.Phone.Value
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
                    new UserPassword(dto.Password, true),
                    ApprovalStatus.approved
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
                    new UserPassword(dto.Password, true),
                    ApprovalStatus.pending
                );
        }
    }
}
