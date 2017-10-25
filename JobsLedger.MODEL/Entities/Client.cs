using System;
using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class Client : IEntityBase
    {
        public Client()
        {
            Jobs = new List<Job>();
        }
        public int Id { get; set; }
        public int ClientNo { get; set; }
        public bool Company { get; set; }
        public string CompanyName { get; set; }
        public string Abn { get; set; }
        public bool IsWarrantyCompany { set; get; }
        public bool RequiresPartsPayment { set; get; }
        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string Phone { get; set; }
        public string Notes { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }

        public int? SuburbId { get; set; }
        public Suburb Suburb { get; set; }


        public string BankName { get; set; }
        public string BankBSB { get; set; }
        public string BankAccount { get; set; }
        public bool Active { get; set; }
        public DateTime? DateDeActivated { get; set; }
        public bool Activity { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public int CreatorId { get; set; }
        public User Creator { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
    }
}
