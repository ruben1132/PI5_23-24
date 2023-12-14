using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Tasks;

namespace Mpt.Infrastructure.PickupDeliveryTasks
{
    internal class PickupDeliveryTaskEntityTypeConfiguration : IEntityTypeConfiguration<PickupDeliveryTask>
    {
        public void Configure(EntityTypeBuilder<PickupDeliveryTask> builder)
        {


            builder.Property(b => b.PickupPersonName);
            builder.Property(b => b.DeliveryPersonName);
            builder.Property(b => b.TaskDescription);
            builder.OwnsOne(b => b.PickupPersonPhoneNumber);
            builder.OwnsOne(b => b.DeliveryPersonPhoneNumber);
            builder.OwnsOne(b => b.ConfirmationCode);
            

        }
    }
}