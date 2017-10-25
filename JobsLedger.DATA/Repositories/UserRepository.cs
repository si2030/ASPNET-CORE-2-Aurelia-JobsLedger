using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;
using System.Collections.Generic;

namespace JobsLedger.DATA.Repositories
{
    public class UserRepository : EntityBaseRepository<User>, IUserRepository
    {
        IRoleRepository _roleReposistory;

        public UserRepository(JobsLedgerAPIContext context, IRoleRepository roleReposistory) : base(context)
        {
            _roleReposistory = roleReposistory;
        }

        public User GetSingleByUsername(string username)
        {
            return GetSingle(x => x.UserName == username);
        }

        public int GetSingleUserIdByUserName(string username)
        {
            var _user = GetSingle(x => x.UserName == username);

            return _user.Id;
        }

        public IEnumerable<Role> GetUserRoles(string username)
        {
            List<Role> _roles = null;

            User _user = GetSingle(u => u.UserName == username, u => u.UserRoles);
            if (_user != null)
            {
                _roles = new List<Role>();

                foreach (var _userRole in _user.UserRoles)
                    _roles.Add(_roleReposistory.GetSingle(_userRole.RoleId));
            }

            return _roles;
        }
    }
}
