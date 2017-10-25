using JobsLedger.API.ViewModels.Clients;
using JobsLedger.API.ViewModels.JobViewModels;
using JobsLedger.DATA.DataServices;
using JobsLedger.MODEL.Entities;

namespace JobsLedger.API.ControllerServices.JobServices
{
    public interface IJobServices
    {
        PagedList<JobIndexViewModel> GetPaginatedJobs(string PaginationDetail);
        JobDetailsViewModel GetJobDetails(int id);
        JobCreateViewModel GetNewJobViewModel(string _user);
        int CreateNewJob(JobCreateViewModel _job, string _user);
        Job UpdateJob(JobDetailsViewModel _job, string _user);
        string DeleteJob(int id);
    }
}
