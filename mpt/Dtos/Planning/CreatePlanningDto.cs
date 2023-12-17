using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class CreatePlanningDto
    {
        public List<string> Tasks { get; private set; }

        public CreatePlanningDto(List<string> tasks)
        {
            this.Tasks = tasks;
        }

    }

}
