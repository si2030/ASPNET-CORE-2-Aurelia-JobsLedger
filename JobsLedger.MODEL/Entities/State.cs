using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobsLedger.MODEL.Entities
{
    public class State : IEntityBase
    {
        public State()
        {
            AddressLocations = new List<Suburb>();
        }
        public int Id { get; set; }
        public string ShortName { get; set; }
        public string Name { get; set; }

        public CompanyDetail CompanyState { get; set; }

        public virtual ICollection<Suburb> AddressLocations { get; set; }
    }
}
