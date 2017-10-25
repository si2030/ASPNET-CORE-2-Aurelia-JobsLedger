using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class StateRepository : EntityBaseRepository<State>, IStateRepository
    {
        public StateRepository(JobsLedgerAPIContext context) : base(context)
        {
        }
    }
}