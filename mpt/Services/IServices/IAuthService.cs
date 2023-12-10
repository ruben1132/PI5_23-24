using Microsoft.AspNetCore.Mvc;
using Mpt.Core.Logic;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IAuthService
    {

        Task<Result<UserWithRoleAndTokenDto>> LoginAsync(UserLoginDto login);

        Task<Result<UserWithRoleAndTokenDto>> SignupAsync(SignupUserDto user);

        Task<Result<UserWithRoleDto>> SessionAsync(string token);
    }
}