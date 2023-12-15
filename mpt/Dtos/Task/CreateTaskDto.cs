
namespace Mpt.Dtos
{
    public class CreateTaskDto
    {

        public string TaskType { get; private set; }


        public CreateTaskDto(string taskType)
        {
            this.TaskType = taskType;

        }


    }

}