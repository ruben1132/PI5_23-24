
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

        public async Task<Result<UserWithRoleAndTokenDto>> LoginAsync(UserLoginDto login)
        {
            try
            {
                var user = await _repo.GetByEmailAsync(login.Email);

                if (user == null)
                {
                    return Result<UserWithRoleAndTokenDto>.Fail("Invalid credentials");
                }

                // validate password
                if (!BCrypt.Net.BCrypt.Verify(login.Password, user.Password.Value))
                {
                    return Result<UserWithRoleAndTokenDto>.Fail("Invalid credentials");
                }

                var role = await _roleRepo.GetByIdAsync(user.RoleId);   // get user role
                var roleDto = RoleMapper.ToDto(role);                   // map role to dto
                var userDto = UserMapper.ToDto(user, roleDto);          // map user to dto
                var token = GenerateJwtToken(userDto);                  // generate token
                var userLogged = UserMapper.ToDto(userDto, token);

                return Result<UserWithRoleAndTokenDto>.Ok(userLogged);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserWithRoleAndTokenDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<UserWithRoleAndTokenDto>> SignupAsync(SignupUserDto user)
        {
            try
            {
                // get default role
                var defaultRole = _config.GetValue<string>("DefaultRole");
                var role = await _roleRepo.GetByNameAsync(defaultRole ?? "utente");

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt());
                user.Password = hashedPassword;

                var newUser = UserMapper.ToDomain(user, role.Id);

                await _repo.AddAsync(newUser);

                await _unitOfWork.CommitAsync();

                var userDto = UserMapper.ToDto(newUser, RoleMapper.ToDto(role));
                var token = GenerateJwtToken(userDto);                  // generate token
                var userLogged = UserMapper.ToDto(userDto, token);

                return Result<UserWithRoleAndTokenDto>.Ok(userLogged);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserWithRoleAndTokenDto>.Fail(ex.Message);
            }
        }

        public async Task<Result<UserWithRoleDto>> SessionAsync(string token)
        {
            try
            {
                // TODO: validate token

                // TODO: extract user from token

                // get user by id
                var user = await _repo.GetByIdAsync(new UserId("TODO"));

                if (user == null)
                {
                    Result<UserWithRoleDto>.Fail("User not found");
                }

                // get user role
                var role = await _roleRepo.GetByIdAsync(user.RoleId);
                var userDto = UserMapper.ToDto(user, RoleMapper.ToDto(role));

                return Result<UserWithRoleDto>.Ok(userDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result<UserWithRoleDto>.Fail(ex.Message);
            }
        }

        private string GenerateJwtToken(UserWithRoleDto user)
        {
            // get settings from app settings
            var secret = _config.GetValue<string>("AuthToken:secret");
            var maxAge = _config.GetValue<int>("AuthToken:maxAge");

            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.Name)}),
                Expires = DateTime.UtcNow.AddMinutes(maxAge),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}