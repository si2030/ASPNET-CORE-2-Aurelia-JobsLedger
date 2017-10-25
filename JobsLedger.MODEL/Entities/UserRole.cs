using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class UserRole : IEntityBase
    {
        public int Id { get; set;  }

        public int UserId { get; set; }
        public User User { get; set; }

        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}
