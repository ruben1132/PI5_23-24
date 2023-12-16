


using Mpt.Domain.Plannings;
using Mpt.Domain.Users;
using Mpt.Dtos;

namespace Mpt.Mappers
{
    public class PlanningMapper
    {
        public static PlanningSimpleDto ToDto(Planning planning)
        {
            return new PlanningSimpleDto(
                    planning.Id.Value,
                    planning.Cost,
                    planning.UserId.Value
                );
        }

        public static PlanningFullDto ToDto(Planning planning, List<TaskSimpleDto> tasks)
        {
            return new PlanningFullDto(
                    planning.Id.Value,
                    tasks,
                    planning.Cost,
                    planning.UserId.Value
                );
        }

        public static Planning ToDomain(CreatePlanningDto dto, string userId, int cost)
        {
            return new Planning(
                    cost,
                    new UserId(userId)
                );
        }
    }
}
