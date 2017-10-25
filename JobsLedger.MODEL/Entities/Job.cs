using System;
using System.Collections.Generic;

namespace JobsLedger.MODEL.Entities
{
    public class Job : IEntityBase
    {
        public Job()
        {
            JobVisits = new List<JobVisit>();
        }

        public int Id { get; set; }

        public int? ClientId { get; set; }
        public Client Client { get; set; }

        public int JobNo { get; set; }
        public string AgentJobNo { get; set; }

        public int? BrandId { get; set; }
        public Brand Brand { get; set; }

        public int CreatorId { get; set; }
        public User Creator { get; set; }

        public int? JobTypeId { get; set; }
        public JobType JobType { get; set; }

        public int? StatusId { get; set; }
        public Status Status { get; set; }

        public string WarrantyCompany { get; set; } //If set its a warranty job.
        public string Model { get; set; }
        public string Serial { get; set; }
        public string ProblemDetails { get; set; }
        public string SolutionDetails { get; set; }
        public string Notes { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public ICollection<JobVisit> JobVisits { get; set; }

    }
}


