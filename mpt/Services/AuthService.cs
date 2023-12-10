
using Mpt.Domain.Users;
using Mpt.Dtos;
using Mpt.IRepositories;
using Mpt.Mappers;
using Mpt.IServices;
using Mpt.Core.Logic;
using Mpt.Core.Domain;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Mpt.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;
        private readonly IRoleRepository _roleRepo;
        private readonly IConfiguration _config;

        public AuthService(IConfiguration config, IUnitOfWork unitOfWork, IUserRepository repo, IRoleRepository roleRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._roleRepo = roleRepo;
            this._config = config;
        }

        public async Task<Result<UserAuthDto>> LoginAsync(UserLoginDto login)
        {
            try
            {
                var user = await _repo.GetByEmailAsync(login.Email);

                if (user == null)
                {
                    return Result<UserAuthDto>.Fail("Invalid credentials");
                }

                // validate password
                if (!BCrypt.Net.BCrypt.Verify(login.Password, user.Password.Value))
                {
                    return Result<UserAuthDto>.Fail("Invalid credentials");
                }

                var role = await _roleRepo.GetByIdAsync(user.RoleId);   // get user role
                var roleDto = RoleMapper.ToDto(role);                   // map role to dto
                var userDto = UserMapper.ToDtoAuth(user, roleDto);          // map user to dto

                return Result<UserAuthDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserAuthDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<UserAuthDto>> SignupAsync(SignupUserDto user)
        {
            try
            {
                // check if email already exists
                var existingUser = await _repo.GetByEmailAsync(user.Email);
                if (existingUser != null)
                {
                    return Result<UserAuthDto>.Fail("Email already exists");
                }

                // get default role
                var defaultRole = _config.GetValue<string>("DefaultRole");
                var role = await _roleRepo.GetByNameAsync(defaultRole ?? "utente");

                if (role == null)
                {
                    return Result<UserAuthDto>.Fail("Default role not found");
                }

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt());
                user.Password = hashedPassword;

                var newUser = UserMapper.ToDomain(user, role.Id);

                await _repo.AddAsync(newUser);

                await _unitOfWork.CommitAsync();

                var roleDto = RoleMapper.ToDto(role);
                var userDto = UserMapper.ToDtoAuth(newUser, roleDto);

                return Result<UserAuthDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserAuthDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<UserAuthDto>> SessionAsync(string token)
        {
            try
            {
                // validate token
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.GetValue<string>("AuthToken:secret"))),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

                // extract user from token
                var userIdClaim = principal.FindFirst(ClaimTypes.Name);
                if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
                {
                    return Result<UserAuthDto>.Fail("Invalid user ID in the token");
                }

                // get user by id
                var user = await _repo.GetByIdAsync(new UserId(userId.ToString()));

                if (user == null)
                {
                    return Result<UserAuthDto>.Fail("User not found");
                }

                // get user role
                var role = await _roleRepo.GetByIdAsync(user.RoleId);
                var userDto = UserMapper.ToDtoAuth(user, RoleMapper.ToDto(role));

                return Result<UserAuthDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserAuthDto>.Fail(ex.Message);
            }
        }

        public Result<string> GenerateJwtToken(UserAuthDto user)
        {
            try
            {
                // get settings from app settings
                var secret = _config.GetValue<string>("AuthToken:secret");
                var maxAge = _config.GetValue<int>("AuthToken:maxAge");

                if (maxAge <= 0)
                {
                    maxAge = 7 * 24 * 60; // 7 days
                }
                // generate token that is valid for 7 days
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] {
                      new Claim(ClaimTypes.Name, user.Id),
                      new Claim(ClaimTypes.Role, user.Role.Name)}),
                    Expires = DateTime.UtcNow.AddMinutes(maxAge),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Result<string>.Ok(tokenString);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<string>.Fail("Error generating token");
            }
        }

    }
}