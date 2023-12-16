namespace Mpt.Dtos
{
    public class PlanningFullDto
    {
        public string Id { get; private set; }
        public List<TaskSimpleDto> Tasks { get; private set; }
        public int Cost { get; private set; }
        public UserProfileDto User { get; set; }

        public PlanningFullDto(string id, List<TaskSimpleDto> tasks, int cost, UserProfileDto user)
        {
            this.Id = id;
            this.Tasks = tasks;
            this.Cost = cost;
            this.User = user;
        }

    }

}
