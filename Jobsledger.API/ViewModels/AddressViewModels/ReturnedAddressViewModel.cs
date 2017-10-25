using JobsLedger.API.ViewModels.ClientViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobsLedger.API.ViewModels.AddressViewModels
{
    public class ReturnedAddressViewModel
    {
        public string Address1 { get; set; }
        public string Address2 { get; set; }

        public StateDropDownViewModel State { get; set; }
        public SuburbDropDownViewModel Suburb { get; set; }
    }
}
