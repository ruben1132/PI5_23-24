using Microsoft.EntityFrameworkCore;
using Mpt.Domain.Roles;
using Mpt.Domain.Users;
using Mpt.Infrastructure.Roles;
using Mpt.Infrastructure.Tasks;
using Mpt.Infrastructure.Users;

namespace Mpt.Infrastructure
{
    public class MptDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Domain.Tasks.Task> Tasks { get; set; }

        public MptDbContext(DbContextOptions options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TaskEntityTypeConfiguration());
        }

        
    }
}