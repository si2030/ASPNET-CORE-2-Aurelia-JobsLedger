using JobsLedger.API.ViewModels.ClientViewModels;
using JobsLedger.API.ViewModels.SelectDataViewModels;
using System.Collections.Generic;

namespace JobsLedger.API.ControllerServices.SelectDataServices
{
    public interface ISelectDataServices
    {
        StateDropdownAndCompanyStateVM GetStatesAndCompanyState();
        List<AddressLocationDropdownVM> GetSuburbDropDownList(string query, int companyStateID);
    }
}
