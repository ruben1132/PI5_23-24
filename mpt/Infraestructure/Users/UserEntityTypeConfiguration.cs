using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mpt.Domain.Roles;
using Mpt.Domain.Users;

namespace Mpt.Infrastructure.Users
{
    internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(b => b.AsGuid(), b => new UserId(b));
            builder.OwnsOne(u => u.Email);
            builder.OwnsOne(u => u.Password);
            builder.OwnsOne(u => u.Phone);
            builder.OwnsOne(u => u.Nif);

            // isApproved allow to be null
            builder
                .Property(u => u.IsApproved)
                .HasDefaultValue(null)
                .IsRequired(false); 

            builder.HasOne<Role>()
                .WithMany()
                .HasForeignKey(u => u.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}