using System;
using System.Collections.Generic;

namespace JobsLedger.API.ViewModels.JobViewModels
{
    public class JobDetailsViewModel
    {
        public JobDetailsViewModel()
        {
            JobVisits = new List<JobVisitViewModel>();
        }

        public int JobId { get; set; }

        public int JobNo { get; set; }
        public string AgentJobNo { get; set; }

        public int ClientId { get; set; }
        public String ClientName { get; set; }
        
        public int BrandId { get; set; }
        public string BrandName { get; set; }

        public int CreatorId { get; set; }
        public string UserName { get; set; }

        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public string WarrantyCompany { get; set; }
        public string Model { get; set; }
        public string Serial { get; set; }
        public string ProblemDetails { get; set; }
        public string SolutionDetails { get; set; }
        public string Notes { get; set; }
        public string DateCreated { get; set; }
        public string DateUpdated { get; set; }

        public ICollection<JobVisitViewModel> JobVisits { get; set; }
    }
}
