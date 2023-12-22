using Mpt.Domain.Tasks;

namespace Mpt.Dtos
{
    public class PlanningSimpleDto
    {
        public string Id { get; private set; }
        public int Cost { get; private set; }
        public string UserId { get; set; }

        public PlanningSimpleDto(string id, int cost, string userId)
        {
            this.Id = id;
            this.Cost = cost;
            this.UserId = userId;
        }

    }

}
