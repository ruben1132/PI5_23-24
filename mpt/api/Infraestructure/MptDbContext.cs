using Microsoft.EntityFrameworkCore;
using Mpt.Domain.Plannings;
using Mpt.Domain.Roles;
using Mpt.Domain.Users;
using Mpt.Infrastructure.PickupDeliveryTasks;
using Mpt.Infrastructure.Plannings;
using Mpt.Infrastructure.Roles;
using Mpt.Infrastructure.SurveillanceTasks;
using Mpt.Infrastructure.Tasks;
using Mpt.Infrastructure.Users;

namespace Mpt.Infrastructure
{
    public class MptDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Domain.Tasks.Task> Tasks { get; set; }
        public DbSet<Planning> Plannings { get; set; }
        public DbSet<PlanningTask> PlanningTasks { get; set; }


        public MptDbContext(DbContextOptions options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SurveillanceTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PickupDeliveryTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PlanningEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PlanningTaskEntityTypeConfiguration());
        }

        
    }
}