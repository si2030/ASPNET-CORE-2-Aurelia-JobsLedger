using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobsLedger.DATA.Repositories
{
    public class UserRoleRepository : EntityBaseRepository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(JobsLedgerAPIContext context)
            : base(context)
        { }
    }
}
