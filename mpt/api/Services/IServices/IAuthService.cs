using Microsoft.AspNetCore.Mvc;
using Mpt.Core.Logic;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IAuthService
    {

        Task<Result<UserAuthDto>> LoginAsync(UserLoginDto login);
        Task<Result<UserAuthDto>> SignupAsync(SignupUserDto user);
        Task<Result<UserAuthDto>> SessionAsync(string token);
        Result<string> GenerateJwtToken(UserAuthDto user);
        
    }
}