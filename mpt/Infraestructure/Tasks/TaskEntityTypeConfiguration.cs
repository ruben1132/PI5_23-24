using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Tasks;

namespace Mpt.Infrastructure.Tasks
{
    internal class TaskEntityTypeConfiguration : IEntityTypeConfiguration<Domain.Tasks.Task>
    {
        public void Configure(EntityTypeBuilder<Domain.Tasks.Task> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(b => b.AsGuid(), b => new TaskId(b));
            builder
                .HasDiscriminator<string>("TaskType")
                .HasValue<SurveillanceTask>("Surveillance")
                .HasValue<PickupDeliveryTask>("PickupDelivery");
        }
    }
}