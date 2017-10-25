using JobsLedger.API.ViewModels.ClientViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobsLedger.API.ViewModels.SelectDataViewModels
{
    public class StateDropdownAndCompanyStateVM
    {
        public StateDropdownAndCompanyStateVM()
        {
           StateDropDownList = new List<StateDropDownViewModel>();
        }

        public int CompanyStateId { get; set; }
        public ICollection<StateDropDownViewModel> StateDropDownList { get; set; }
    }
}
