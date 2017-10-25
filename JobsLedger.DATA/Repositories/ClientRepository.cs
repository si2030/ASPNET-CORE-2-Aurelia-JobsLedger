using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.DATA.Repositories
{
    public class ClientRepository : EntityBaseRepository<Client>, IClientRepository
    {
        private new JobsLedgerAPIContext _context;

        public ClientRepository(JobsLedgerAPIContext context) : base(context)
        {
            _context = context;
        }

        public void RelatedSuburbEntities(Suburb _suburb)
        {
            _context.Entry(_suburb).Reference<State>(a => a.State).Load();
        }
    }
}
