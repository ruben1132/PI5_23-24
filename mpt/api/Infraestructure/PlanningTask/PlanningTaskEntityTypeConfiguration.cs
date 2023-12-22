using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class PlanningTaskEntityTypeConfiguration : IEntityTypeConfiguration<PlanningTask>
{
    public void Configure(EntityTypeBuilder<PlanningTask> builder)
    {
        builder.HasKey(pt => new { pt.PlanningId, pt.TaskId });

        builder
            .HasOne(pt => pt.Planning)
            .WithMany(p => p.PlanningTasks)
            .HasForeignKey(pt => pt.PlanningId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(pt => pt.Task)
            .WithMany(t => t.PlanningTasks)
            .HasForeignKey(pt => pt.TaskId)
            .OnDelete(DeleteBehavior.Cascade);

        // builder.Property(pt => pt.SequenceOrder)
        //     .UseIdentityColumn(); 

    }
}