


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

        public static PlanningFullDto ToDto(Planning planning, List<TaskSimpleDto> tasks, UserProfileDto user)
        {
            return new PlanningFullDto(
                    planning.Id.Value,
                    tasks,
                    planning.Cost,
                    user
                );
        }

        public static Planning ToDomain(string userId, int cost)
        {
            return new Planning(
                    cost,
                    new UserId(userId)
                );
        }

        public static PlanningTask ToEntity(Planning planning, Mpt.Domain.Tasks.Task task, int sequenceOrder)
        {
            return new PlanningTask
            {
                Planning = planning,
                Task = task,
                SequenceOrder = sequenceOrder
            };

        }
    }
}
