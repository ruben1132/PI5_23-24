using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Tasks;
using Mpt.Domain.Users;
using Newtonsoft.Json;

namespace Mpt.Infrastructure.Tasks
{
    internal class TaskEntityTypeConfiguration : IEntityTypeConfiguration<Domain.Tasks.Task>
    {
        public void Configure(EntityTypeBuilder<Domain.Tasks.Task> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(b => b.AsGuid(), b => new TaskId(b));
            // robot movements
            builder.Property(t => t.RobotMovements)
                .HasConversion(
                    v => ConvertMovementsToString(v),
                    v => ConvertStringToMovements(v))
                .HasColumnName("Movements")
                .Metadata.SetValueComparer(
                        new ValueComparer<List<RobotMovement>>(
                            (c1, c2) => c1.Equals(c2),
                            c => c.GetHashCode()));

            // path
            builder
            .Property(t => t.Path)
            .HasConversion(
                v => string.Join(',', v),   // Convert List<string> to string
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());  // Convert string to List<string>

            // isApproved allow to be null
            builder
                .Property(t => t.IsApproved)
                .HasDefaultValue(null)
                .IsRequired(false); 

            // TPH
            builder.HasDiscriminator<string>("TaskType")
              .HasValue<SurveillanceTask>("Surveillance")
              .HasValue<PickupDeliveryTask>("PickupDelivery");

            // Foreign key for UserId
            builder.HasOne<User>()
              .WithMany()
              .HasForeignKey(p => p.UserId)
              .IsRequired()
              .OnDelete(DeleteBehavior.Cascade);

            // many to many relationship
            builder
                .HasMany(t => t.PlanningTasks)
                .WithOne(pt => pt.Task)
                .HasForeignKey(pt => pt.TaskId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private static string ConvertMovementsToString(List<RobotMovement> movements)
        {
            // Convert the list of RobotMovement objects to a JSON string
            return JsonConvert.SerializeObject(movements);
        }

        private static List<RobotMovement> ConvertStringToMovements(string value)
        {
            if (value == null)
            {
                return new List<RobotMovement>();
            }

            // Convert the JSON string back to a list of RobotMovement objects
            return JsonConvert.DeserializeObject<List<RobotMovement>>(value);
        }


    }

}