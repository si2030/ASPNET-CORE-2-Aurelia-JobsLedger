using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class LoggingRepository : EntityBaseRepository<Error>, ILoggingRepository
    {
        public LoggingRepository(JobsLedgerAPIContext context) : base(context)
        { }

        public override void Commit()
        {
            try
            {
                base.Commit();
            }
            catch { }
        }
    }
}
