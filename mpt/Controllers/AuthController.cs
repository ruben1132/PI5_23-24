using Microsoft.AspNetCore.Mvc;
using Mpt.IServices;
using Mpt.Dtos;
using Mpt.IControllers;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;


namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase, IAuthController
    {
        private readonly IConfiguration _config;
        private readonly IAuthService _service;
        private readonly IWebHostEnvironment _env;

        public AuthController(IConfiguration config, IAuthService service, IWebHostEnvironment env)
        {
            this._config = config;
            this._service = service;
            this._env = env;
        }

        // POST: api/Auth/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserWithRoleDto>> Login(UserLoginDto loginDto)
        {
            try
            {
                var user = await _service.LoginAsync(loginDto);

                if (user.IsFailure)
                {
                    return BadRequest(new { error = user.Error });
                }

                var token = this._service.GenerateJwtToken(user.Value);
                if (token.IsFailure)
                {
                    return BadRequest(new { error = token.Error });
                }

                SetCookie(token.GetValue());
                return Ok(user.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST: api/Auth
        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<ActionResult<UserWithRoleDto>> Signup(SignupUserDto dto)
        {
            try
            {
                var user = await _service.SignupAsync(dto);

                if (user.IsFailure)
                {
                    return BadRequest(new { error = user.Error });
                }

                // var token = this._service.GenerateJwtToken(user.Value);
                // if (token.IsFailure)
                // {
                //     return BadRequest(new { error = token.Error });
                // }

                // SetCookie(token.GetValue());

                return Ok(user.GetValue());

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // GET: api/Auth/session
        [AllowAnonymous]
        [HttpGet("session")]
        public async Task<ActionResult<UserWithRoleDto>> Session()
        {
            try
            {
                var cName = GetCookieName();
                var token = Request.Cookies[cName];

                if (string.IsNullOrEmpty(token))
                {
                    return BadRequest(new { message = "No session found" });
                }

                var user = await _service.SessionAsync(token);

                if (user.IsFailure)
                {
                    return BadRequest(new { error = user.Error });
                }

                return Ok(user.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST: api/Auth/validate
        [AllowAnonymous]
        [HttpPost("validate")]
        public async Task<ActionResult<UserWithRoleDto>> ValidateToken(TokenDto token)
        {
            try
            {
                var user = await _service.SessionAsync(token.Token);

                if (user.IsFailure)
                {
                    return BadRequest(new { error = user.Error });
                }

                return Ok(user.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        // POST: apit/Auth/logout
        [AllowAnonymous]
        [HttpPost("logout")]
        public ActionResult Logout()
        {
            try
            {
                // destroy cookie
                var cName = GetCookieName();
                Response.Cookies.Delete(cName);

                return Ok(new { message = "Logout successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { error = ex.Message });
            }
        }

        private void SetCookie(string token)
        {
            var cName = GetCookieName();

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
                SameSite = SameSiteMode.None,
                Secure = true,
                Path = "/",
            };

            if (this._env.IsDevelopment())
            {
                cookieOptions.Secure = false;
                cookieOptions.SameSite = SameSiteMode.Lax;
                cookieOptions.Domain = "localhost";
            }

            Response.Cookies.Append(cName, token, cookieOptions);
        }

        private string GetCookieName()
        {
            return this._config.GetValue<string>("Cookie:name") ?? "robdronego_authCookie";
        }

    }
}