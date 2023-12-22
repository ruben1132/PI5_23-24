using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Shared;
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
            builder.OwnsOne(b => b.ConfirmationCode);

            builder.Property(e => e.PickupPersonPhoneNumber)
            .HasConversion(
                v => v.Value, // to db
                v => new PhoneNumber(v ?? "", false));  //  from db
            
            builder.Property(e => e.DeliveryPersonPhoneNumber)
            .HasConversion(
                v => v.Value, 
                v => new PhoneNumber(v ?? "", false));  
        }
    }
}