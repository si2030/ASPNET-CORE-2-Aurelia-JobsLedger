using System;
using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class User : IEntityBase
    {
        public User()
        {
            JobsCreated = new List<Job>();
            ClientsCreated = new List<Client>();
            UserRoles = new List<UserRole>();
        }
        public int Id { get; set; }
        public int UserNo { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public bool IsLocked { get; set; }
        public DateTime DateCreated { get; set; }

        public int? SuburbId { get; set; }
        public Suburb Suburb { get; set; }

        public virtual ICollection<Job> JobsCreated { get; set; }
        public virtual ICollection<Client> ClientsCreated { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
