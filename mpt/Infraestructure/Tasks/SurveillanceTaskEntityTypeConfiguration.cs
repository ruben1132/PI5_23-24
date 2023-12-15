using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Shared;
using Mpt.Domain.Tasks;

namespace Mpt.Infrastructure.SurveillanceTasks
{
    internal class SurveillanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTask>
    {
        public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
        {

            builder.Property(e => e.PhoneNumber)
            .HasConversion(
                v => v.Value,  // to db
                v => new PhoneNumber(v ?? "", false));  // from db

        }
    }
}