namespace JobsLedger.API.ViewModels.JobViewModels
{
    public class JobIndexViewModel
    {
        public int JobId { get; set; }
        public int JobNo { get; set; }
        public string ClientName { get; set; }
        public string AgentJobNo { set; get; }
        public string JobType { get; set; }
        public string Status { get; set; }
        public string WarrantyCompany { get; set; }

        public int JobVisits { get; set; }
    }
}
