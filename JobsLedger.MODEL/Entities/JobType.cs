using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class JobType : IEntityBase
    {
        public JobType()
        {
            JobsWithJobType = new List<Job> ();
        }

        public int Id { get; set; }
        public string JobTypeName { get; set; }

        public ICollection<Job> JobsWithJobType { get; set; }
    }
}
