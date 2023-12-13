using Mpt.Domain.Plannings;
using Mpt.Domain.Tasks;

public class PlanningTask
{
    public PlanningId PlanningId { get; set; }
    public Planning Planning { get; set; }

    public TaskId TaskId { get; set; }
    public Mpt.Domain.Tasks.Task Task { get; set; }

    public int SequenceOrder { get; set; }
}