using JobsLedger.API.ViewModels.Clients;
using JobsLedger.DATA.DataServices;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.API.ControllerServices.ClientServices
{
    public interface IClientServices
    {
        PagedList<ClientIndexViewModel> GetPaginatedClients(string query, int currentPage, int pageSize, ClientListSortBy sortBy = ClientListSortBy.LastName, SortDirection sortDirection = SortDirection.Ascending);
        ClientDetailsViewModel CreateNewClient(ClientCreateViewModel model, string user);
        ClientDetailsViewModel GetClientDetails(int id);
        Client UpdateClient(ClientDetailsViewModel _client, string _user);
        string DeleteDeactivateClient(int id);
    }
}
