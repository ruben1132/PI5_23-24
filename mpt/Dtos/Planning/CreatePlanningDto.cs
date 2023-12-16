using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreatePlanningDto
    {
        public List<TaskId> Tasks { get; private set; }

        public CreatePlanningDto(List<TaskId> tasks)
        {
            this.Tasks = tasks;
        }

    }

}
