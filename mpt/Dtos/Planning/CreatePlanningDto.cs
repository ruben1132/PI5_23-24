using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreatePlanningDto
    {
        public List<TaskId> Tasks { get; private set; }
        public string UserId { get; set; }

        public CreatePlanningDto(List<TaskId> tasks, string userId)
        {
            this.Tasks = tasks;
            this.UserId = userId;
        }

    }

}
