namespace JobsLedger.API.ViewModels.ClientViewModels
{
    public class SuburbViewModel
    {
        public int Id { get; set; }
        public string Suburb { get; set; }
        public string PostCode { get; set; }

        public int StateId { get; set; }
        public StateViewModel State { get; set; }

        public double Latitude { get; set; }
        public double Longditude { get; set; }
    }
}
