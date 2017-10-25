using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class Role : IEntityBase
    {
        public Role()
        {
            UserRoles = new List<UserRole>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection <UserRole> UserRoles { get; set; }
    }
}
