using Mpt.Core.Domain;

namespace Mpt.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MptDbContext _context;

        public UnitOfWork(MptDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}