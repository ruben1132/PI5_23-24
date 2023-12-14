using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Tasks;

namespace Mpt.Infrastructure.SurveillanceTasks
{
    internal class SurveillanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTask>
    {
        public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
        {

            builder.OwnsOne(b => b.PhoneNumber);

        }
    }
}