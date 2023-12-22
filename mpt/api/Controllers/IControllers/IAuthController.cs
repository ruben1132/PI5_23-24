
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface IAuthController
    {

        Task<ActionResult<UserWithRoleDto>> Login(UserLoginDto login);
        Task<ActionResult<UserWithRoleDto>> Signup(SignupUserDto user);
        Task<ActionResult<UserWithRoleDto>> Session();
        Task<ActionResult<UserWithRoleDto>> ValidateToken(TokenDto token);
        ActionResult Logout();


    }
}