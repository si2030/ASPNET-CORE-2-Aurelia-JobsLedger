using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class SuburbRepository : EntityBaseRepository<Suburb>, ISuburbRepository
    {
        public SuburbRepository(JobsLedgerAPIContext context) : base(context)
        {
        }
    }
}