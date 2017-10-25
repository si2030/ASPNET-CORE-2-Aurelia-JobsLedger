using JobsLedger.MODEL.Entities;
using System.Security.Principal;

namespace JobsLedger.DATA
{
    public class MembershipContext
    {
        public IPrincipal Principal { get; set; }
        public User User { get; set; }
        public bool IsValid()
        {
            return Principal != null;
        }
    }
}
