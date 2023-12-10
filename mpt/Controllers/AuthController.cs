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

        public AuthController(IConfiguration config, IAuthService service)
        {
            this._config = config;
            this._service = service;
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
                    return BadRequest(user.Error);
                }

                SetCookie(user.Value.Token);

                return Ok(user.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(JsonConvert.SerializeObject(ex.Message));
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
                    return BadRequest(user.Error);
                }

                SetCookie(user.Value.Token);

                return Ok(user.GetValue());

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Error while signning up");
            }
        }

        // GET: api/Auth/session
        [HttpGet("session")]
        public async Task<ActionResult<UserWithRoleDto>> Session()
        {
            try
            {
                var cName = GetCookieName();
                var token = Request.Cookies[cName];

                if (string.IsNullOrEmpty(token))
                {
                    return BadRequest("No session found");
                }

                var user = await _service.SessionAsync(token);

                if (user.IsFailure)
                {
                    return BadRequest(user.Error);
                }

                return Ok(user.GetValue());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Error while getting session");
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

                return Ok("logged out successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Error while logging out");
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

            Response.Cookies.Append(cName, token, cookieOptions);
        }

        private string GetCookieName()
        {
            return this._config.GetValue<string>("Cookie:name") ?? "robdronego:authCookie";
        }

    }
}