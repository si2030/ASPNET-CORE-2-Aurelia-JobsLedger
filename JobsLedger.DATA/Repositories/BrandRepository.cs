using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class BrandRepository : EntityBaseRepository<Brand>, IBrandRepository
    {
        public BrandRepository(JobsLedgerAPIContext context)
            : base(context)
        { }
    }
}
