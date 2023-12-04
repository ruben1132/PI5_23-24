using Mpt.Domain.Categories;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.Categories
{
    public class CategoryRepository : BaseRepository<Category, CategoryId>, ICategoryRepository
    {
    
        public CategoryRepository(MptDbContext context):base(context.Categories)
        {
           
        }


    }
}