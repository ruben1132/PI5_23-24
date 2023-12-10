
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface IRolesController
    {
        Task<ActionResult<RoleDto>> Create(CreateRoleDto role);
        Task<ActionResult<RoleDto>> Update(RoleDto role);
        Task<ActionResult<IEnumerable<RoleDto>>> GetAll(RoleDto role);
        Task<ActionResult<RoleDto>> GetById(Guid id);
        Task<ActionResult<string>> Delete(Guid id);
    }
}