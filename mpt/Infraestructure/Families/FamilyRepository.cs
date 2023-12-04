using Mpt.Domain.Families;
using Mpt.Infrastructure.Shared;

namespace Mpt.Infrastructure.Families
{
    public class FamilyRepository : BaseRepository<Family, FamilyId>, IFamilyRepository
    {
      
        public FamilyRepository(MptDbContext context):base(context.Families)
        {
            
        }

    }
}