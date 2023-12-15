


using Mpt.Domain.Plannings;
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.Mappers
{
    public class PlanningMapper
    {
        public static PlanningWithTasksDto ToDto(Planning planning, List<TaskSimpleDto> tasks)
        {
            return new PlanningWithTasksDto(
                    planning.Id.Value, 
                    tasks,
                    planning.Cost,
                    planning.UserId.Value
                );
        }

        public static Planning ToDomain(CreatePlanningDto dto)
        {
            return new Planning(
                    dto.Cost,
                    new UserId(dto.UserId)
                );
        }
    }
}
