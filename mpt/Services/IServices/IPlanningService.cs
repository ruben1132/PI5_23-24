using Mpt.Core.Logic;
using Mpt.Domain.Plannings;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IPlanningService{

        Task<Result<PlanningWithTasksDto>> AddAsync(CreatePlanningDto dto);
        Task<Result<PlanningWithTasksDto>> GetByIdAsync(PlanningId id);
        Task<Result<List<PlanningWithTasksDto>>> GetAllAsync();
    }
}