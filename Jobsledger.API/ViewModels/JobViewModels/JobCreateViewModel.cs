using JobsLedger.API.ViewModels.ClientViewModels;
using System;
using System.Collections.Generic;

namespace JobsLedger.API.ViewModels.JobViewModels
{
    public class JobCreateViewModel
    {
        public JobCreateViewModel()
        {
            BrandDropDownList = new List<BrandDropDownViewModel>();
            JobTypeDropDownList = new List<JobTypeDropDownViewModel>();
            StatusDropDownList = new List<StatusDropDownViewModel>();
            ClientDropdownList = new List<ClientSelectViewModel>();
        }
        public int JobId { get; set; }

        public int JobNo { get; set; }
        public string AgentJobNo { get; set; }

        public int ClientId { get; set; }
        public String ClientName { get; set; }

        public int BrandId { get; set; }
        public string BrandName { get; set; }

        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public string UserName { get; set; }

        public string WarrantyCompany { get; set; }
        public string Model { get; set; }
        public string Serial { get; set; }
        public string ProblemDetails { get; set; }
        public string SolutionDetails { get; set; }
        public string Notes { get; set; }

        public ICollection<BrandDropDownViewModel> BrandDropDownList { get; set; }
        public ICollection<JobTypeDropDownViewModel> JobTypeDropDownList { get; set; }
        public ICollection<StatusDropDownViewModel> StatusDropDownList { get; set; }
        public ICollection<ClientSelectViewModel> ClientDropdownList { get; set; }
    }
}
