using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class CompanyDetailRepository : EntityBaseRepository<CompanyDetail>, ICompanyDetailRepository
    {
        public CompanyDetailRepository(JobsLedgerAPIContext context) : base(context)
        {
        }
    }
}