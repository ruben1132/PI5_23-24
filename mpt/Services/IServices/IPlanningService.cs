using Mpt.Domain.Plannings;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IPlanningService{

        Task<PlanningWithTasksDto> AddAsync(CreatePlanningDto dto);

        Task<PlanningWithTasksDto> GetByIdAsync(PlanningId id);

        Task<List<PlanningWithTasksDto>> GetAllAsync();
    }
}