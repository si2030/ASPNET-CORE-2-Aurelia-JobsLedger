using JobsLedger.API.ViewModels.ClientViewModels;
using JobsLedger.API.ViewModels.SelectDataViewModels;
using JobsLedger.DATA.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JobsLedger.API.ControllerServices.SelectDataServices
{
    public class SelectDataServices : ISelectDataServices
    {
        private ICompanyDetailRepository _companyDetailRepository;
        private ISuburbRepository _SuburbRepository;
        private IStateRepository _stateRepository;

        public SelectDataServices(
            ICompanyDetailRepository companyDetailRepository,
            ISuburbRepository AddressLocationRepository,
            IStateRepository stateRepository
            )
        {
            _companyDetailRepository = companyDetailRepository;
            _SuburbRepository = AddressLocationRepository;
            _stateRepository = stateRepository;
        }

        //Return all required select dropdown data.
        public StateDropdownAndCompanyStateVM GetStatesAndCompanyState()
        {
            var model = new StateDropdownAndCompanyStateVM();

            model.CompanyStateId = _companyDetailRepository.GetSingle(c => c.Id == 1, c => c.Suburb).Suburb.StateId;
            model.StateDropDownList = GetStateDropdownList();

            return model;
        }


        // Return state details for state dropdown.
        private List<StateDropDownViewModel> GetStateDropdownList()
        {
            var model = new List<StateDropDownViewModel>();

            var states = _stateRepository.GetAll();

            foreach (var state in states)
            {
                var stateModel = new StateDropDownViewModel();

                stateModel.StateId = state.Id;
                stateModel.StateName = state.Name;
                stateModel.StateShortName = state.ShortName;

                model.Add(stateModel);
            }

            return model;
        }



        // Return address locations for dropdowns.
        public List<AddressLocationDropdownVM> GetSuburbDropDownList(string query, int companyStateID)
        {
            var model = new List<AddressLocationDropdownVM>();

            var Suburbs = _SuburbRepository.AllIncluding(a => a.State);

            var fliteredSuburbs = Suburbs
            .Where(c => c.StateId == companyStateID && (string.IsNullOrWhiteSpace(query) ||
                    c.SuburbName.StartsWith(query, StringComparison.OrdinalIgnoreCase))).ToList();

            foreach (var addressLocation in fliteredSuburbs)
            {
                var addressLocationDropDown = new AddressLocationDropdownVM();

                addressLocationDropDown.Id = addressLocation.Id;
                addressLocationDropDown.SuburbName = addressLocation.SuburbName;
                addressLocationDropDown.Postcode = addressLocation.PostCode;
                addressLocationDropDown.State = addressLocation.State.ShortName;

                model.Add(addressLocationDropDown);
            }

            return model;
        }
    }

}
