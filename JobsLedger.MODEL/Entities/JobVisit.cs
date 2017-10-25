using System;
using System.Collections.Generic;
using System.Text;

namespace JobsLedger.MODEL.Entities
{
    public class JobVisit : IEntityBase
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime VisitDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Notes { get; set; }

        public int? JobId { get; set; }
        public Job Job { get; set; }

        public int? JobVisitTypeId { get; set; }
        public JobVisitType VisitType { get; set; }
    }
}
