using JobsLedger.API.ViewModels.JobViewModels;
using System.Collections.Generic;

namespace JobsLedger.API.ViewModels
{
    public class ClientJobListingViewModel
    {
        public ClientJobListingViewModel()
        {
            JobVisits = new List<JobVisitViewModel>();
        }
        public int Id { get; set; }
        public int JobNo { get; set; }
        public string AgentJobNo { get; set; }
        public string JobType { get; set; }
        public string Status { get; set; }
        public string WarrantyCompany { get; set; }
        public string NumberOfVisits { get; set; }

        public ICollection<JobVisitViewModel> JobVisits { get; set; }
    }
}
