using Mpt.Domain.Products;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.Products
{
    public class ProductRepository : BaseRepository<Product, ProductId>,IProductRepository
    {
        public ProductRepository(MptDbContext context):base(context.Products)
        {
           
        }
    }
}