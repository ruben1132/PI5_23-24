using Mpt.Domain.Shared;

namespace Mpt.Domain.Products
{
    public interface IProductRepository: IRepository<Product,ProductId>
    {
    }
}