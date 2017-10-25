using System;
using System.Collections.Generic;
using System.Text;

namespace JobsLedger.MODEL.Entities
{
    public class JobVisitType
    {
        public JobVisitType()
        {
            JobsVisitTypes = new List<JobVisit>();
        }

        public int Id { get; set; }
        public string JobVisitTypeName { get; set; }

        public ICollection<JobVisit> JobsVisitTypes { get; set; }
    }
}
