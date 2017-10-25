using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class JobTypeRepository : EntityBaseRepository<JobType>, IJobTypeRepository
    {
        public JobTypeRepository(JobsLedgerAPIContext context)
            : base(context)
        { }
    }
}