
namespace Mpt.Dtos
{
    public class CreateTaskDto
    {

        public string TaskType { get; private set; }
        public string OriginType { get; set; }
        public string Origin { get; set; }
        public string DestinyType { get; set; }
        public string Destiny { get; set; }


        public CreateTaskDto(string taskType, string originType, string origin, string destinyType, string destiny)
        {
            this.TaskType = taskType;
            this.OriginType = originType;
            this.Origin = origin;
            this.DestinyType = destinyType;
            this.Destiny = destiny;

        }


    }

}