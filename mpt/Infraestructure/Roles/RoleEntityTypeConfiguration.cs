using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Roles;

namespace Mpt.Infrastructure.Roles
{
    internal class RoleEntityTypeConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(b => b.AsGuid(), b => new RoleId(b));
            builder.Property(b => b.Name).HasMaxLength(50).IsRequired();
        }
    }
}