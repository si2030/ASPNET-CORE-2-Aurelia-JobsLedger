using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobsLedger.API.ViewModels.SelectDataViewModels
{
    public class AddressLocationDropdownVM
    {
        public AddressLocationDropdownVM()
        {
        }

        public int Id { get; set; }
        public string SuburbName { get; set; }
        public string Postcode { get; set; }
        public string State { get; set; }
    }
}
