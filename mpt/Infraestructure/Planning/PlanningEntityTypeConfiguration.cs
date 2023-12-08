using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Plannings;
using Mpt.Domain.Tasks;
using Mpt.Domain.Users;

namespace Mpt.Infrastructure.Plannings
{
    internal class PlanningEntityTypeConfiguration : IEntityTypeConfiguration<Planning>
    {
        public void Configure(EntityTypeBuilder<Planning> builder)
        {
            builder.HasKey(p => p.Id);

            // Foreign key for UserId
            builder.HasOne<User>()
              .WithMany()
              .HasForeignKey(p => p.UserId)
              .IsRequired();

            // many to many relationship
            builder
                .HasMany(p => p.PlanningTasks)
                .WithOne(pt => pt.Planning)
                .HasForeignKey(pt => pt.PlanningId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}