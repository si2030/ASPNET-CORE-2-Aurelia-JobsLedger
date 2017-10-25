using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class Brand : IEntityBase
    {
        public Brand()
        {
            JobsWithABrand = new List<Job>();
        }
        public int Id { get; set; }
        public string BrandName { get; set; }
        public string ContactName { get; set; }
        public string ContactPhNo { get; set; }
        public string TechnicalPhNo { get; set; }
        public string SparePartsPhNo { get; set; }

        public virtual ICollection<Job> JobsWithABrand { get; set; }
    }
}
