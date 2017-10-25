namespace JobsLedger.API.ViewModels.Clients
{
    public class ClientIndexViewModel
    {
        public int ClientId { get; set; }
        public int ClientNo { get; set; }
        public bool Company { get; set; }
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string DisplayAddress { get; set; }
        public string MobilePhone { get; set; }
        public string DateCreated { get; set; }
        public string DeActivated { get; set; }
        public string Jobs { get; set; }
        public bool Active { get; set; }
        public bool Activity { get; set; }

    }
}
