using Microsoft.IdentityModel.Tokens;
using Mpt.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Mpt.Middleware
{
    public class MyMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;
        private readonly IServiceScopeFactory _scopeFactory;

        public MyMiddleware(RequestDelegate next, IConfiguration config, IServiceScopeFactory scopeFactory)
        {
            _next = next;
            _config = config;
            _scopeFactory = scopeFactory;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var cName = _config.GetValue<string>("Cookie:name") ?? "robdronego_authCookie";
            var token = context.Request.Cookies[cName];

            if (!string.IsNullOrEmpty(token))
            {
                context.Request.Headers.Append("Authorization", "Bearer " + token);
                AttachUserToContext(context, token);
            }

            await _next(context);
        }

        private async void AttachUserToContext(HttpContext context, string token)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                try
                {
                    var secret = _config.GetValue<string>("AuthToken:secret");

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(secret);

                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                    }, out SecurityToken validatedToken);

                    var jwtToken = (JwtSecurityToken)validatedToken;
                    var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "unique_name").Value);

                    var userService = scope.ServiceProvider.GetRequiredService<IUserService>();

                    // Attach user to context on successful jwt validation
                    context.Items["user"] = await userService.GetByIdAsync(userId);
                    Console.WriteLine($"User {userId} attached to context");
                }
                catch (Exception ex)
                {
                    // Log or handle specific exceptions
                    Console.WriteLine($"Failed to validate cookie. {ex.Message}");
                }
            }
        }
    }
}
