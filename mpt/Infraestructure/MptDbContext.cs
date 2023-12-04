using Microsoft.EntityFrameworkCore;
using Mpt.Domain.Categories;
using Mpt.Domain.Families;
using Mpt.Domain.Products;
using Mpt.Infrastructure.Categories;
using Mpt.Infrastructure.Products;

namespace Mpt.Infrastructure
{
    public class MptDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Family> Families { get; set; }

        public MptDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
        }
    }
}