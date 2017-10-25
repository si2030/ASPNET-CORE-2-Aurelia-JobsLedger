namespace JobsLedger.MODEL.Entities
{
    public class CompanyDetail : IEntityBase
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactEmail { get; set; }
        public string MobilePhone { get; set; }
        public string OfficePhone { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyStreet1 { get; set; }
        public string CompanyStreet2 { get; set; }

        public int? SuburbId { get; set; }
        public Suburb Suburb { get; set; }

        public string ABN { get; set; }
        public string BankName { get; set; }
        public string BankBSB { get; set; }
        public string BankAccount { get; set; }
    }
}
