using JobsLedger.API.ViewModels.ClientViewModels;
using JobsLedger.API.ViewModels.JobViewModels;
using JobsLedger.DATA.Abstract;
using JobsLedger.DATA.DataServices;
using JobsLedger.MODEL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JobsLedger.API.ControllerServices.JobServices
{
    public class JobServices : IJobServices
    {
        private IJobRepository _jobRepository;
        private IClientRepository _clientRepository;
        private IStateRepository _stateRepository;
        private IBrandRepository _brandRepository;
        private IJobTypeRepository _jobTypeRepository;
        private IStatusRepository _statusRepository;
        private IUserRepository _userRepository;
        private IProgramCounterRepository _programCounterRepository;
        int page = 1;
        int pageSize = 10;

        public JobServices(
            IJobRepository jobRepository,
            IClientRepository clientRepository,
            IStateRepository stateRepository,
            IBrandRepository brandRepository,
            IJobTypeRepository jobTypeRepository,
            IStatusRepository statusRepository,
            IUserRepository userRepository,
            IProgramCounterRepository programCounterRepository)
        {
            _jobRepository = jobRepository;
            _clientRepository = clientRepository;
            _stateRepository = stateRepository;
            _brandRepository = brandRepository;
            _jobTypeRepository = jobTypeRepository;
            _statusRepository = statusRepository;
            _userRepository = userRepository;
            _programCounterRepository = programCounterRepository;
        }

        // Return Paged List.
        public PagedList<JobIndexViewModel> GetPaginatedJobs(string PaginationDetail)
        {
            if (!string.IsNullOrEmpty(PaginationDetail))
            {
                string[] vals = PaginationDetail.ToString().Split(',');
                int.TryParse(vals[0], out page);
                int.TryParse(vals[1], out pageSize);
            }

            int currentPage = page;
            int currentPageSize = pageSize;
            var totalJobs = _jobRepository.Count();
            var totalPages = (int)Math.Ceiling((double)totalJobs / pageSize);


            //var myclients = Job.JobJobs.select()

            IEnumerable<Job> _jobs = _jobRepository
               .AllIncluding(j => j.Client, j => j.Brand, j => j.Creator, j => j.JobType, j => j.Status)
               .OrderBy(j => j.Id)
               .Skip((currentPage - 1) * currentPageSize)
               .Take(currentPageSize)
               .ToList();
            //
            var _jobVMList = new List<JobIndexViewModel>();

            foreach (var _job in _jobs)
            {
                var _model = MapJobListToVM(_job);

                _jobVMList.Add(_model);
            }

            string sortBy = null;
            string sortDirection = null;

            var JobPagedVMList = new PagedList<JobIndexViewModel>(_jobVMList, page, pageSize, totalJobs, totalPages, sortBy.ToString(), sortDirection.ToString());

            return JobPagedVMList;
        }

        // Return client details.
        public JobDetailsViewModel GetJobDetails(int id)
        {

            Job _job = _jobRepository.GetSingle(j => j.Id == id, j => j.Client, j => j.Brand, j => j.Creator, j => j.JobType, j => j.Status, j => j.JobVisits);

            if (_job != null)
            {
                if (_job.JobVisits != null)
                {
                    _jobRepository.RelatedJobEnities(_job);
                }

                JobDetailsViewModel _jobDetailsVM = mapJobDetailsToVM(_job);

                return _jobDetailsVM;
            }
            else
            {
                return null;
            }
        }

        // Create new Job - GET - Supplies lists for dropdowns.
        public JobCreateViewModel GetNewJobViewModel(string _user)
        {
            return MapModelToJob(_user);
        }

        // Create new job - POSTBACK.
        public int CreateNewJob(JobCreateViewModel _job, string _user)
        {
            return MapModelToJob(_job, _user);
        }

        // Update returned job.
        public Job UpdateJob(JobDetailsViewModel _job, string _user)
        {
            return MapUpdatedJobDetailsToJob(_job, _user);
        }

        // Delete or Deactivate job.
        public string DeleteJob(int id)
        {
            Job _job = _jobRepository.GetSingle(id);

            if (_job == null)
            {
                return null;
            }

            _jobRepository.Delete(_job);

            return "Deleted";
        }


        // HELPER MEHODS
        private JobIndexViewModel MapJobListToVM(Job _job)
        {
            var _model = new JobIndexViewModel();

            _model.JobId = _job.Id;
            _model.JobNo = _job.JobNo;

            string dspClientFirstName = string.IsNullOrWhiteSpace(_job.Client.ClientFirstName) ? "" : _job.Client.ClientFirstName;
            string dspClientLastName = string.IsNullOrWhiteSpace(_job.Client.ClientLastName) ? "" : _job.Client.ClientLastName;

            _model.ClientName = string.Format("{0} {1}", dspClientFirstName, dspClientLastName);

            _model.AgentJobNo = _job.AgentJobNo;
            _model.JobType = _job.JobType.JobTypeName;
            _model.Status = _job.Status.StatusName;
            _model.WarrantyCompany = _job.WarrantyCompany;


            _model.JobVisits = _job.JobVisits.Count();

            return _model;
        }

        private JobDetailsViewModel mapJobDetailsToVM(Job _job)
        {
            var _model = new JobDetailsViewModel();

            _model.JobId = _job.Id;
            _model.JobNo = _job.JobNo;
            _model.AgentJobNo = _job.AgentJobNo;

            string dspClientFirstName = string.IsNullOrWhiteSpace(_job.Client.ClientFirstName) ? "" : _job.Client.ClientFirstName;
            string dspClientLastName = string.IsNullOrWhiteSpace(_job.Client.ClientLastName) ? "" : _job.Client.ClientLastName;

            _model.ClientName = string.Format("{0} {1}", dspClientFirstName, dspClientLastName);

            _model.BrandId = _job.Brand.Id;
            _model.BrandName = _job.Brand.BrandName;

            _model.CreatorId = _job.Creator.Id;
            _model.UserName = _job.Creator.UserName;

            _model.JobTypeId = _job.JobType.Id;
            _model.JobTypeName = _job.JobType.JobTypeName;

            _model.StatusId = _job.Status.Id;
            _model.StatusName = _job.Status.StatusName;

            _model.WarrantyCompany = _job.WarrantyCompany;
            _model.Model = _job.Model;
            _model.Serial = _job.Serial;
            _model.ProblemDetails = _job.ProblemDetails;
            _model.SolutionDetails = _job.SolutionDetails;
            _model.Notes = _job.Notes;
            _model.DateCreated = _job.DateCreated.ToString("dd/MM/yyyy");
            _model.DateUpdated = _job.DateUpdated != null ? _job.DateUpdated.Value.ToString("dd/MM/yyyy") : "n/a";

            if (_job.JobVisits.Count() > 0)
            {
                foreach (var _jobVisit in _job.JobVisits)
                {
                    var _jobVisitModel = new JobVisitViewModel();

                    _jobVisitModel.JobVistId = _jobVisit.Id;
                    _jobVisitModel.DateCreated = _jobVisit.DateCreated.ToString("dd/MM/yyyy");
                    _jobVisitModel.VisitDate = _jobVisit.VisitDate.ToString("dd/MM/yyyy");
                    _jobVisitModel.StartTime = _jobVisit.StartTime.ToString("hh:mm");
                    _jobVisitModel.EndTime = _jobVisit.EndTime.ToString("hh:mm");

                    _model.JobVisits.Add(_jobVisitModel);
                }
            }
            return _model;
        }

        // Return empty model with lists for Brand and JobType dropdowns.
        private JobCreateViewModel MapModelToJob(string _userName)
        {
            var _model = new JobCreateViewModel();

            var _brands = _brandRepository.GetAll();

            foreach (var _brand in _brands)
            {
                var _brandViewModel = new BrandDropDownViewModel();

                _brandViewModel.Id = _brand.Id;
                _brandViewModel.BrandName = _brand.BrandName;

                _model.BrandDropDownList.Add(_brandViewModel);
            }

            var _jobTypes = _jobTypeRepository.GetAll();

            foreach (var _jobType in _jobTypes)
            {
                var _jobTypeViewModel = new JobTypeDropDownViewModel();

                _jobTypeViewModel.Id = _jobType.Id;
                _jobTypeViewModel.JobTypeName = _jobType.JobTypeName;

                _model.JobTypeDropDownList.Add(_jobTypeViewModel);
            }

            var _statuses = _statusRepository.GetAll();

            foreach (var _status in _statuses)
            {
                var _statusViewModel = new StatusDropDownViewModel();

                _statusViewModel.Id = _status.Id;
                _statusViewModel.StatusName = _status.Description;

                _model.StatusDropDownList.Add(_statusViewModel);
            }

            var _clients = _clientRepository.GetAll()
                                            .OrderBy(c => c.ClientLastName)
                                            .ToList();

            foreach (var _client in _clients)
            {
                var _clientSelect = new ClientSelectViewModel();

                _clientSelect.Id = _client.Id;

                _clientSelect.ClientNo = _client.ClientNo;

                string dspClientFirstName = string.IsNullOrWhiteSpace(_client.ClientFirstName) ? "" : _client.ClientFirstName;
                string dspClientLastName = string.IsNullOrWhiteSpace(_client.ClientLastName) ? "" : _client.ClientLastName;

                if (dspClientFirstName != null)
                {
                    _clientSelect.DisplayName = string.Format("{0}, {1}", dspClientLastName, dspClientFirstName);
                }
                else
                {
                    _clientSelect.DisplayName = dspClientLastName;
                }

                _model.ClientDropdownList.Add(_clientSelect);
            }
            _model.UserName = _userName;

            return _model;
        }

        private int MapModelToJob(JobCreateViewModel _model, string _userName)
        {
            //TODO Check for compulsory fields and return fail if they dont exist. Fix Fluentvalidation

            var _job = new Job();

            _job.JobNo = _programCounterRepository.RetrieveNewEntityNumber("JobNo");
            _job.ClientId = _model.ClientId;

            _job.CreatorId = _userRepository.GetSingleUserIdByUserName(_userName);
            _job.BrandId = _model.BrandId;
            _job.JobTypeId = _model.JobTypeId;
            _job.StatusId = _model.StatusId;

            _job.CreatorId = _userRepository.GetSingleUserIdByUserName(_userName);

            _job.WarrantyCompany = _model.WarrantyCompany;
            _job.Model = _model.Model;
            _job.Serial = _model.Serial;
            _job.ProblemDetails = _model.ProblemDetails;
            _job.SolutionDetails = _model.SolutionDetails;
            _job.Notes = _model.Notes;
            _job.DateCreated = DateTime.Now;

            _jobRepository.Add(_job);
            _jobRepository.Commit();

            return _job.Id;
        }

        private Job MapUpdatedJobDetailsToJob(JobDetailsViewModel _model, string _userName)
        {
            Job _job = _jobRepository.GetSingle(c => c.Id == _model.JobId);

            if (_job == null)
            {
                return null;
            }

            // NOTE: "Active" and "Activity" will be taken care of in the Delete controller option and
            //       the creating of a job respectively.

            _job.JobNo = _model.JobNo;
            _job.ClientId = _model.ClientId;

            _job.CreatorId = _userRepository.GetSingleUserIdByUserName(_userName);
            _job.BrandId = _model.BrandId;
            _job.JobTypeId = _model.JobTypeId;
            _job.StatusId = _model.StatusId;

            _job.CreatorId = _userRepository.GetSingleUserIdByUserName(_userName);

            _job.WarrantyCompany = _model.WarrantyCompany;
            _job.Model = _model.Model;
            _job.Serial = _model.Serial;
            _job.ProblemDetails = _model.ProblemDetails;
            _job.SolutionDetails = _model.SolutionDetails;
            _job.Notes = _model.Notes;

            _job.DateUpdated = DateTime.Now;

            _jobRepository.Edit(_job);
            _jobRepository.Commit();

            return _job;
        }
    }
}
