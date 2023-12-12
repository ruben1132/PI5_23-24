namespace Mpt.Dtos
{
    public class PlanningWithTasksDto
    {
        public string Id { get; private set; }
        public List<TaskDto> Tasks { get; private set; }
        public int Cost { get; private set; }
        public string UserId { get; set; }

        public PlanningWithTasksDto(string id, List<TaskDto> tasks, int cost, string userId)
        {
            this.Id = id;
            this.Tasks = tasks;
            this.Cost = cost;
            this.UserId = userId;
        }

    }

}