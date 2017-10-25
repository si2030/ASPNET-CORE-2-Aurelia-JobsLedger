using JobsLedger.API.ViewModels;
using JobsLedger.API.ViewModels.Clients;
using JobsLedger.API.ViewModels.JobViewModels;
using JobsLedger.DATA.Abstract;
using JobsLedger.DATA.DataServices;
using JobsLedger.MODEL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JobsLedger.API.ControllerServices.ClientServices
{
    public class ClientServices : IClientServices
    {
        private ICompanyDetailRepository _companyDetailRepository;
        private IClientRepository _clientRepository;
        private ISuburbRepository _AddressLocationRepository;
        private IStateRepository _stateRepository;
        private IJobRepository _jobRepository;
        private IUserRepository _userRepository;
        private IProgramCounterRepository _programCounterRepository;

        public ClientServices(
            ICompanyDetailRepository companyDetailRepository,
            IClientRepository clientRepository,
            ISuburbRepository AddressLocationRepository,
            IStateRepository stateRepository,
            IJobRepository jobRepository,
            IUserRepository userRepository,
            IProgramCounterRepository programCounterRepository)
        {
            _companyDetailRepository = companyDetailRepository;
            _clientRepository = clientRepository;
            _AddressLocationRepository = AddressLocationRepository;
            _stateRepository = stateRepository;
            _jobRepository = jobRepository;
            _userRepository = userRepository;
            _programCounterRepository = programCounterRepository;
        }

        // Return Paged List.
        public PagedList<ClientIndexViewModel> GetPaginatedClients(string query, int currentPage, int pageSize,
            ClientListSortBy sortBy, SortDirection sortDirection)
        {
            var clientsIncluding = _clientRepository
               .AllIncluding(s => s.Creator, s => s.Jobs, s => s.Suburb);

            var filteredClients = clientsIncluding
                .Where(c => string.IsNullOrWhiteSpace(query) ||
                    c.ClientLastName.IndexOf(query, StringComparison.OrdinalIgnoreCase) != -1 ||
                    c.ClientFirstName.IndexOf(query, StringComparison.OrdinalIgnoreCase) != -1 ||
                    c.ClientNo.ToString().IndexOf(query, StringComparison.OrdinalIgnoreCase) != -1 ||
                    c.Suburb.SuburbName.IndexOf(query, StringComparison.OrdinalIgnoreCase) != -1 ||
                    c.Phone.IndexOf(query, StringComparison.OrdinalIgnoreCase) != -1 ||
                    c.MobilePhone.IndexOf(query, StringComparison.OrdinalIgnoreCase) != -1
                );

            IOrderedEnumerable<Client> orderedClients;
            switch (sortBy)
            {
                case ClientListSortBy.ClientNumber:
                    orderedClients = OrderClients(filteredClients, s => s.ClientNo, sortDirection);
                    break;
                case ClientListSortBy.LastName:
                    orderedClients = OrderClients(filteredClients, s => s.ClientLastName, sortDirection);
                    break;
                case ClientListSortBy.FirstName:
                    orderedClients = OrderClients(filteredClients, s => s.ClientFirstName, sortDirection);
                    break;
                case ClientListSortBy.Suburb:
                    orderedClients = OrderClients(filteredClients, s => s.Suburb != null ? s.Suburb.SuburbName : null, sortDirection);
                    break;
                case ClientListSortBy.Jobs:
                    orderedClients = OrderClients(filteredClients, s => s.Jobs != null ? s.Jobs.Count : 0, sortDirection);
                    break;
                default:
                    orderedClients = OrderClients(filteredClients, s => s.ClientLastName, sortDirection);
                    break;
            }

            var totalClients = orderedClients.ToList().Count();
            var totalPages = (int)Math.Ceiling((double)totalClients / pageSize);
            if (currentPage > totalPages)
            {
                currentPage = totalPages;
            }

            var paginatedClients = orderedClients
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var clientVMList = new List<ClientIndexViewModel>();

            foreach (var client in paginatedClients)
            {
                // Need to also get the state for the paged list of clients.
                _clientRepository.RelatedSuburbEntities(client.Suburb);

                var model = MapClientToVM(client);

                clientVMList.Add(model);
            }

            var clientPagedVMList = new PagedList<ClientIndexViewModel>(clientVMList,
                                                                        currentPage,
                                                                        pageSize,
                                                                        totalClients,
                                                                        totalPages,
                                                                        sortBy.ToString(),
                                                                        sortDirection.ToString());

            return clientPagedVMList;
        }

  
        // Create new client.
        public ClientDetailsViewModel CreateNewClient(ClientCreateViewModel model, string user)
        {
            if (model != null)
            {
                return mapNewClientViewModelToClient(model, user);
            }
            return null;
        }


        // Return client details.
        public ClientDetailsViewModel GetClientDetails(int id)
        {
            Client client = _clientRepository.GetSingle(c => c.Id == id, c => c.Creator, c => c.Jobs, c => c.Suburb);

            if (client != null)
            {
                if (client.Suburb != null)
                {
                    _clientRepository.RelatedSuburbEntities(client.Suburb);
                }

                if (client.Jobs != null)
                {
                    _jobRepository.RelatedJobEnities(client.Jobs);
                }

                ClientDetailsViewModel clientDetailsViewModel = mapClientDetailsToViewModel(client);

                return clientDetailsViewModel;
            }
            else
            {
                return null;
            }
        }


        // Update returned client.
        public Client UpdateClient(ClientDetailsViewModel _client, string user)
        {
            return MapUpdatedClientDetailsBackToClient(_client, user);
        }

        // Delete or Deactivate client.
        public string DeleteDeactivateClient(int id)
        {
            Client client = _clientRepository.GetSingle(id);

            if (client == null)
            {
                return null;
            }

            if (client.Activity == false)  // There are no jobs for this client and can be deleted.
            {
                _clientRepository.Delete(client);

                return "Deleted";
            }
            else
            {
                client.Active = false;

                return "Deactivated";
            }
        }


        // HELPER MEHODS
        //**************

        // For index listing.
        // Order function to identify sort direction.
        private IOrderedEnumerable<Client> OrderClients<T>(IEnumerable<Client> clients, Func<Client, T> keySelector, SortDirection sortDirection)
        {
            return (sortDirection == SortDirection.Descending)
                ? clients.OrderByDescending(keySelector)
                : clients.OrderBy(keySelector);
        }

        // Map function to map a client to the index view model.
        private ClientIndexViewModel MapClientToVM(Client client)
        {
            var model = new ClientIndexViewModel();

            model.ClientId = client.Id;
            model.ClientNo = client.ClientNo;
            model.Company = client.Company;
            model.FirstName = client.ClientFirstName;
            model.LastName = client.ClientLastName;
            model.CompanyName = client.CompanyName;
            model.MobilePhone = client.MobilePhone;
            model.Active = client.Active;
            model.DeActivated = client.DateDeActivated != null ? client.DateDeActivated.Value.ToString("dd/MM/yyyy") : "n/a";
            model.Activity = client.Activity;
            model.DateCreated = client.DateCreated.ToString("dd/MM/yyyy");

            string dspClientFirstName = string.IsNullOrWhiteSpace(client.ClientFirstName) ? "" : client.ClientFirstName;
            string dspClientLastName = string.IsNullOrWhiteSpace(client.ClientLastName) ? "" : client.ClientLastName;

            model.DisplayName = string.Format("{0}, {1}", dspClientLastName, dspClientFirstName);

            string dspStreet1 = string.IsNullOrWhiteSpace(client.Address1) ? "" : client.Address1;
            string dspStreet2 = string.IsNullOrWhiteSpace(client.Address2) ? "" : client.Address2;
            string dspSuburb = string.IsNullOrWhiteSpace(client.Suburb.SuburbName) ? "" : client.Suburb.SuburbName;
            string dspState = string.IsNullOrWhiteSpace(client.Suburb.State.ShortName) ? "" : client.Suburb.State.ShortName;
            string dspPostCode = string.IsNullOrWhiteSpace(client.Suburb.PostCode) ? "" : client.Suburb.PostCode;

            if (dspStreet2 == "")
            {
                model.DisplayAddress = string.Format("{0} {1} {2} {3}", dspStreet1, dspSuburb, dspState, dspPostCode);
            }
            else
            {
                model.DisplayAddress = string.Format("{0} {1} {2} {3} {4}", dspStreet1, dspStreet2, dspSuburb, dspState, dspPostCode);
            }
            model.Jobs = client.Jobs.Count().ToString();

            return model;
        }

        // Saves new Client to database
        private ClientDetailsViewModel mapNewClientViewModelToClient(ClientCreateViewModel model, string user)
        {
            var client = new Client();

            client.ClientNo = _programCounterRepository.RetrieveNewEntityNumber("ClientNo");  // Should update the counter at the same time.
            client.Company = model.Company;
            client.CompanyName = model.CompanyName;
            client.Abn = model.Abn;
            client.IsWarrantyCompany = model.IsWarrantyCompany;
            client.RequiresPartsPayment = model.RequiresPartsPayment;
            client.ClientFirstName = model.ClientFirstName;
            client.ClientLastName = model.ClientLastName;
            client.Email = model.Email;
            client.MobilePhone = model.MobilePhone;
            client.Phone = model.Phone;
            client.Notes = model.Notes;
            client.Address1 = model.Address.Address1;
            client.Address2 = model.Address.Address2;
            client.SuburbId = model.Address.Suburb.Id;
            client.BankName = model.BankName;
            client.BankBSB = model.BankBSB;
            client.BankAccount = model.BankAccount;
            client.Active = true;
            client.Activity = false;
            client.DateCreated = DateTime.Now;
            client.DateUpdated = DateTime.Now;
            client.CreatorId = _userRepository.GetSingle(u => u.UserName == user).Id;

            _clientRepository.Add(client);
            _clientRepository.Commit();


            return mapClientDetailsToViewModel(client);
            //return client;
        }

        // Maps client to viewmodel to send back to browser.
        private ClientDetailsViewModel mapClientDetailsToViewModel(Client client)
        {
            var model = new ClientDetailsViewModel();

            model.ClientId = client.Id;
            model.ClientNo = client.ClientNo;
            model.Company = client.Company;
            model.CompanyName = client.CompanyName;
            model.IsWarrantyCompany = client.IsWarrantyCompany;
            model.RequiresPartsPayment = client.RequiresPartsPayment;
            model.ClientFirstName = client.ClientFirstName;
            model.ClientLastName = client.ClientLastName;
            model.Email = client.Email;
            model.MobilePhone = client.MobilePhone;
            model.Phone = client.Phone;
            model.Notes = client.Notes;

            model.Address1 = client.Address1;
            model.Address2 = client.Address2;

            var clientSuburb = _AddressLocationRepository.GetSingle(a => a.Id == client.SuburbId);
            var ClientState = _stateRepository.GetSingle(s => s.Id == clientSuburb.StateId);

            model.Suburb = clientSuburb.SuburbName;
            model.Postcode = clientSuburb.PostCode;
            model.StateShortName = ClientState.ShortName;

            model.ABN = client.Abn;
            model.BankName = client.BankName;
            model.BankBSB = client.BankBSB;
            model.BankAccount = client.BankAccount;
            model.Active = client.Active;
            model.DeActivated = client.DateDeActivated != null ? client.DateDeActivated.Value.ToString("dd/MM/yyyy") : "n/a";
            model.Activity = client.Activity;
            model.DateCreated = client.DateCreated.ToString("dd/MM/yyyy");
            model.DateUpdated = client.DateUpdated != null ? client.DateUpdated.Value.ToString("dd/MM/yyyy") : "n/a";

            // Obtain any jobs the client has including any visits for those jobs.
            if (client.Jobs.Count() > 0)
            {
                foreach (Job job in client.Jobs)
                {
                    var jobViewModel = new ClientJobListingViewModel();

                    jobViewModel.Id = job.Id;
                    jobViewModel.AgentJobNo = job.AgentJobNo;
                    jobViewModel.JobNo = job.JobNo;
                    jobViewModel.JobType = job.JobType.JobTypeName;
                    jobViewModel.Status = job.Status.StatusName;
                    jobViewModel.WarrantyCompany = job.WarrantyCompany;
                    jobViewModel.NumberOfVisits = job.JobVisits.Count.ToString();

                    if (job.JobVisits.Count() > 0)
                    {
                        foreach (var jobVisit in job.JobVisits)
                        {
                            var jobVisitModel = new JobVisitViewModel();

                            jobVisitModel.JobVistId = jobVisit.Id;
                            jobVisitModel.DateCreated = jobVisit.DateCreated.ToString("dd/MM/yyyy");
                            jobVisitModel.VisitDate = jobVisit.VisitDate.ToString("dd/MM/yyyy");
                            jobVisitModel.StartTime = jobVisit.StartTime.ToString("hh:mm");
                            jobVisitModel.EndTime = jobVisit.EndTime.ToString("hh:mm");

                            jobViewModel.JobVisits.Add(jobVisitModel);
                        }
                    }
                    model.Jobs.Add(jobViewModel);
                }
            }

            model.CreatorId = client.CreatorId;
            model.CreatorName = client.Creator.UserName;

            return model;
        }

        private Client MapUpdatedClientDetailsBackToClient(ClientDetailsViewModel model, string _userName)
        {
            Client client = _clientRepository.GetSingle(c => c.Id == model.ClientId);

            if (client == null)
            {
                return null;
            }

            // NOTE: "Active" and "Activity" will be taken care of in the Delete controller option and
            //       the creating of a _job respectively.

            client.ClientNo = model.ClientNo;
            client.Company = model.Company;
            client.CompanyName = model.CompanyName;
            client.ClientFirstName = model.ClientFirstName;
            client.ClientLastName = model.ClientLastName;
            client.Email = model.Email;
            client.MobilePhone = model.MobilePhone;
            client.Phone = model.Phone;
            client.Notes = model.Notes;
            client.Address1 = model.Address1;
            client.Address2 = model.Address2;
            client.SuburbId = model.AddressLocationId;
            client.Abn = model.ABN;
            client.BankName = model.BankName;
            client.BankBSB = model.BankBSB;
            client.BankAccount = model.BankAccount;

            client.CreatorId = _userRepository.GetSingleUserIdByUserName(_userName);

            client.DateUpdated = DateTime.Now;

            _clientRepository.Edit(client);
            _clientRepository.Commit();

            return client;
        }
    }
}
