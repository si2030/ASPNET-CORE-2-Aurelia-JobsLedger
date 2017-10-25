using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class Status : IEntityBase
    {
        public Status()
        {
            JobsWithStatus = new List<Job>();
        }

        public int Id { get; set; }
        public string StatusName { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }

        public ICollection<Job> JobsWithStatus { get; set; }
    }
}
