using JobsLedger.MODEL.Entities;
using System.Collections.Generic;

namespace JobsLedger.DATA.DataServices.Abstract
{
    public interface IMembershipService
    {
        MembershipContext ValidateUser(string username, string password);
        User CreateUser(string username, string email, string password, int[] roles);
        User GetUser(int userId);
        IEnumerable<Role> GetUserRoles(string username);
    }
}
