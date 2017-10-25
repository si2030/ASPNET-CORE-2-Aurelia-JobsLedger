using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class StatusRepository : EntityBaseRepository<Status>, IStatusRepository
    {
        public StatusRepository(JobsLedgerAPIContext context)
            : base(context)
        { }
    }
}