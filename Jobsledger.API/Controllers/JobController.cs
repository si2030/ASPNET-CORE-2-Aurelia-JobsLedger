using JobsLedger.API.ControllerServices.JobServices;
using JobsLedger.API.ViewModels.JobViewModels;
using JobsLedger.DATA.DataServices;
using JobsLedger.MODEL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobsLedger.API.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    //[Authorize(Policy = "AdminOnly")]
    public class JobController : Controller
    {
        private IJobServices _jobServices;

        private IHttpContextAccessor _httpContextAccessor;

        private string _user;

        public JobController(IJobServices jobServices, IHttpContextAccessor httpContextAccessor)
        {
            _jobServices = jobServices;
            _httpContextAccessor = httpContextAccessor;
            _user = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpGet("Index", Name = "JobIndex")]
        public IActionResult Index()
        {
            // TODO: refactor-fix this
            var _jobPagedVMList = _jobServices.GetPaginatedJobs(Request.Headers["Pagination"]);

            return new OkObjectResult(_jobPagedVMList);
        }

        [HttpGet("{id}", Name = "GetJob")]
        public IActionResult Get(int id)
        {
            var _jobDetailsVM = _jobServices.GetJobDetails(id);

            if (_jobDetailsVM != null)
            {
                return new OkObjectResult(_jobDetailsVM);

            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("Create", Name = "CreateJob")]
        public IActionResult Create()
        {
            // An empty jobcreate view model has lists for dropdowns.
            var _newJob = _jobServices.GetNewJobViewModel(_user);

            if(_newJob != null)
            {
                return new OkObjectResult(_newJob);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody]JobCreateViewModel _job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int _Id = _jobServices.CreateNewJob(_job, _user);

            CreatedAtRouteResult result = CreatedAtRoute("GetJob", new { controller = "Jobs", id = _Id }, _job);
            return result;
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]JobDetailsViewModel _job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Job _UpdatedJob = _jobServices.UpdateJob(_job, _user);

            if (_UpdatedJob == null)
            {
                return NotFound();
            }
            else
            {
                return new NoContentResult();
            }
        }

        [HttpDelete("{id}", Name = "RemoveOrDeactivateJob")]
        public IActionResult DeleteOrDeactivate(int id)
        {
            var result = _jobServices.DeleteJob(id);

            if (result == null)
            {
                return new NotFoundResult();
            }
            else
            {
                return new OkObjectResult(result);
            }
        }
    }
}


