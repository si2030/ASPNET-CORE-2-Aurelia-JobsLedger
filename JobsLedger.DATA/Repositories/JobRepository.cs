using JobsLedger.DATA.Abstract;
using JobsLedger.MODEL.Entities;
using System.Collections.Generic;
using System.Linq;

namespace JobsLedger.DATA.Repositories
{
    public class JobRepository : EntityBaseRepository<Job>, IJobRepository
    {
        private new JobsLedgerAPIContext _context;

        public JobRepository(JobsLedgerAPIContext context) : base(context)
        {
            _context = context;
        }

        public void RelatedJobEnities(Job _job)
        {
            if (_job.JobVisits != null)
            {
                foreach (var _jobVisit in _job.JobVisits)
                {
                    _context.Entry(_jobVisit).Reference<JobVisitType>(v => v.VisitType);
                }
            }

            _context.Entry(_job).Reference<Brand>(j => j.Brand).Load();

            _context.Entry(_job).Reference<User>(j => j.Creator).Load();

            _context.Entry(_job).Reference<JobType>(j => j.JobType).Load();

            _context.Entry(_job).Reference<Status>(j => j.Status).Load();
        }


        public void RelatedJobEnities(ICollection<Job> _jobs)
        {
            if (_jobs.Count > 0)
            {
                foreach (var _job in _jobs)
                {
                    _context.Entry(_job).Collection<JobVisit>(j => j.JobVisits).Load();

                    foreach (var _jobVisit in _job.JobVisits)
                    {
                        _context.Entry(_jobVisit).Reference<JobVisitType>(v => v.VisitType);
                    }

                    _context.Entry(_job).Reference<Brand>(j => j.Brand).Load();

                    _context.Entry(_job).Reference<User>(j => j.Creator).Load();

                    _context.Entry(_job).Reference<JobType>(j => j.JobType).Load();

                    _context.Entry(_job).Reference<Status>(j => j.Status).Load();
                }
            }
        }


    }
}

