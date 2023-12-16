using Mpt.Core.Logic;
using Mpt.Domain.Plannings;
using Mpt.Dtos;

namespace Mpt.IServices
{
    public interface IPlanningService{

        Task<Result<PlanningFullDto>> AddAsync(CreatePlanningDto dto, Guid userId);
        Task<Result<PlanningFullDto>> GetByIdAsync(Guid id);
        Task<Result<List<PlanningFullDto>>> GetAllAsync();
        Task<Result<PlanningSimpleDto>> DeleteAsync(Guid id);
    }
}