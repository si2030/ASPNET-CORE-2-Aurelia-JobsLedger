using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class Suburb : IEntityBase
    {
        public Suburb()
        {
            Clients = new List<Client>();
            CompanyDetails = new List<CompanyDetail>();
            Users = new List<User>();
        }
        public int Id { get; set; }
        public string SuburbName { get; set; }
        public string PostCode { get; set; }

        public int StateId { get;  set; }
        public State State { get; set; }

        public double Latitude { get; set; }
        public double Longditude { get; set; }

        public virtual ICollection<Client> Clients { get; set; }
        public virtual ICollection<CompanyDetail> CompanyDetails { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
