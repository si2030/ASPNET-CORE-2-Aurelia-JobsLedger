using JobsLedger.API.ControllerServices.SelectDataServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace JobsLedger.API.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [AllowAnonymous]
    public class SelectDataController : Controller
    {
        private ISelectDataServices _selectDataServices;

        private IHttpContextAccessor _httpContextAccessor;

        public SelectDataController(ISelectDataServices selectDataServices, IHttpContextAccessor httpContextAccessor)
        {
            _selectDataServices = selectDataServices;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet("GetStatesAndCompanyStateId", Name = "GetStatesAndCompanyStateId")]
        public IActionResult GetStatesAndCompanyStateId()
        {
            var selectData = _selectDataServices.GetStatesAndCompanyState();

            if (_selectDataServices != null)
            {
                return new OkObjectResult(selectData);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("QuerySuburbs", Name = "QuerySuburbs")]
        public IActionResult QuerySuburbs(string query, int CompanyStateId)
        {
            var selectData = _selectDataServices.GetSuburbDropDownList(query, CompanyStateId);

            if (_selectDataServices != null)
            {
                return new OkObjectResult(selectData);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
