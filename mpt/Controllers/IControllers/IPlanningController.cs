
using Microsoft.AspNetCore.Mvc;
using Mpt.Dtos;

namespace Mpt.IControllers
{
    public interface IPlanningsController
    {
        Task<ActionResult<PlanningFullDto>> Create(CreatePlanningDto planning);
        Task<ActionResult<IEnumerable<PlanningFullDto>>> GetAll();
        Task<ActionResult<PlanningFullDto>> GetById(Guid id);
        Task<ActionResult<string>> Delete(Guid id);
    }
}