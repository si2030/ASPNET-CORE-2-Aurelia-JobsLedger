using JobsLedger.DATA.Abstract;
using JobsLedger.DATA.DataServices.Abstract;
using JobsLedger.MODEL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

namespace JobsLedger.DATA.DataServices
{
    public class MembershipService : IMembershipService
    {
        #region Variables
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IEncryptionService _encryptionService;
        #endregion

        public MembershipService(IUserRepository userRepository, 
                                 IRoleRepository roleRepository,
                                 IUserRoleRepository userRoleRepository, 
                                 IEncryptionService encryptionService)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _userRoleRepository = userRoleRepository;
            _encryptionService = encryptionService;
        }

        #region IMembershipService Implementation

        public MembershipContext ValidateUser(string username, string password)
        {
            var membershipCtx = new MembershipContext();

            var user = _userRepository.GetSingleByUsername(username);

            if (user != null && IsUserValid(user, password))
            {
                var userRoles = GetUserRoles(user.UserName);

                membershipCtx.User = user;

                var identity = new GenericIdentity(user.UserName);

                membershipCtx.Principal = new GenericPrincipal(identity, userRoles.Select(x => x.Name).ToArray() );
            }

            return membershipCtx;
        }
        public User CreateUser(string username, string email, string password, int[] roles)
        {
            var existingUser = _userRepository.GetSingleByUsername(username);

            if (existingUser != null)
            {
                throw new Exception("Username is already in use");
            }

            var passwordSalt = _encryptionService.CreateSalt();

            var user = new User()
            {
                UserName = username,
                Salt = passwordSalt,
                Email = email,
                IsLocked = false,
                HashedPassword = _encryptionService.EncryptPassword(password, passwordSalt),
                DateCreated = DateTime.Now
            };

            _userRepository.Add(user);

            _userRepository.Commit();

            if (roles != null || roles.Length > 0)
            {
                foreach (var role in roles)
                {
                    AddUserToRole(user, role);
                }
            }

            _userRepository.Commit();

            return user;
        }

        public User GetUser(int userId)
        {
            return _userRepository.GetSingle(userId);
        }

        public IEnumerable<Role> GetUserRoles(string username)
        {
                return _userRepository.GetUserRoles(username);
        }
        #endregion

        #region Helper methods
        private void AddUserToRole(User user, int roleId)
        {
            var role = _roleRepository.GetSingle(roleId);
            if (role == null)
                throw new Exception("Role doesn't exist.");

            var userRole = new UserRole()
            {
                RoleId = role.Id,
                UserId = user.Id
            };
            _userRoleRepository.Add(userRole);

            _userRepository.Commit();
        }

        private bool IsUserValid(User user, string password)
        {
            if (IsPasswordValid(user, password))
            {
                return !user.IsLocked;
            }

            return false;
        }

        private bool IsPasswordValid(User user, string password)
        {
            var _hashedPassword = string.Equals(_encryptionService.EncryptPassword(password, user.Salt), user.HashedPassword);
            return _hashedPassword;
        }
        #endregion
    }
}
