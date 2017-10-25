using JobsLedger.API.ControllerServices.ClientServices;
using JobsLedger.API.ViewModels.Clients;
using JobsLedger.MODEL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

namespace JobsLedger.API.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    //[Authorize(Policy = "AdminOnly")]
    public class ClientController : Controller
    {
        private IClientServices _clientServices;

        private IHttpContextAccessor _httpContextAccessor;

        private string _user;

        public ClientController(IClientServices clientServices, IHttpContextAccessor httpContextAccessor)
        {
            _clientServices = clientServices;
            _httpContextAccessor = httpContextAccessor;
            _user = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        [HttpGet("Index", Name = "ClientIndex")]
        public IActionResult Index(string query, int page, int pageSize, ClientListSortBy sortBy, SortDirection sortDirection)
        {
            if (page < 1)
            {
                page = 1;
            }

            var clientPagedVMList = _clientServices.GetPaginatedClients(query, page, pageSize, sortBy, sortDirection);

            return new OkObjectResult(clientPagedVMList);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]ClientCreateViewModel client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var clientResult = _clientServices.CreateNewClient(client, _user);
            // TODO: populate these details into a more UI-friendly (i.e. SECURE) view model
            // for now, we'll just remove the offending property
            //clientResult.Creator = null;

            return new OkObjectResult(clientResult);

            //return new JsonResult(clientResult);
        }

        [HttpGet("edit/{id}", Name = "Edit")]
        public IActionResult Edit(int id)
        {
            var clientDetailsVM = _clientServices.GetClientDetails(id);

            if (clientDetailsVM != null)
            {
                return new OkObjectResult(clientDetailsVM);

            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ClientDetailsViewModel client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Client _UpdatedClient = _clientServices.UpdateClient(client, _user);

            if (_UpdatedClient == null)
            {
                return NotFound();
            }
            else
            {
                return new NoContentResult();
            }
        }



        [HttpDelete("{id}", Name = "RemoveOrDeactivateClient")]
        public IActionResult DeleteOrDeactivate(int id)
        {
            var result = _clientServices.DeleteDeactivateClient(id);

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



//[HttpPost]
//public IActionResult Create([FromBody]UserViewModel client)
//{

//    if (!ModelState.IsValid)
//    {
//        return BadRequest(ModelState);
//    }

//    User _newUser = new User { Name = client.Name, Profession = client.Profession, Avatar = client.Avatar };

//    _userRepository.Add(_newUser);
//    _userRepository.Commit();

//    client = Mapper.Map<User, UserViewModel>(_newUser);

//    CreatedAtRouteResult result = CreatedAtRoute("GetUser", new { controller = "Users", id = client.Id }, client);
//    return result;
//}
//[HttpGet("{id}", Name = "GetClient")]
//public IActionResult Get(int id)
//{
//    Schedule _schedule = clientRepository
//        .GetSingle(s => s.Id == id, s => s.Creator, s => s.Attendees);

//    if (_schedule != null)
//    {
//        ScheduleViewModel _scheduleVM = Mapper.Map<Schedule, ScheduleViewModel>(_schedule);
//        return new OkObjectResult(_scheduleVM);
//    }
//    else
//    {
//        return NotFound();
//    }
//}

//[HttpGet("{id}/details", Name = "GetScheduleDetails")]
//public IActionResult GetScheduleDetails(int id)
//{
//    Schedule _schedule = clientRepository
//        .GetSingle(s => s.Id == id, s => s.Creator, s => s.Attendees);

//    if (_schedule != null)
//    {


//        ScheduleDetailsViewModel _scheduleDetailsVM = Mapper.Map<Schedule, ScheduleDetailsViewModel>(_schedule);

//        foreach (var attendee in _schedule.Attendees)
//        {
//            User _userDb = _userRepository.GetSingle(attendee.UserId);
//            _scheduleDetailsVM.Attendees.Add(Mapper.Map<User, UserViewModel>(_userDb));
//        }


//        return new OkObjectResult(_scheduleDetailsVM);
//    }
//    else
//    {
//        return NotFound();
//    }
//}

//[HttpPost]
//public IActionResult Create([FromBody]ScheduleViewModel schedule)
//{
//    if (!ModelState.IsValid)
//    {
//        return BadRequest(ModelState);
//    }

//    Schedule _newSchedule = Mapper.Map<ScheduleViewModel, Schedule>(schedule);
//    _newSchedule.DateCreated = DateTime.Now;

//    clientRepository.Add(_newSchedule);
//    clientRepository.Commit();

//    foreach (var userId in schedule.Attendees)
//    {
//        _newSchedule.Attendees.Add(new Attendee { UserId = userId });
//    }
//    clientRepository.Commit();

//    schedule = Mapper.Map<Schedule, ScheduleViewModel>(_newSchedule);

//    CreatedAtRouteResult result = CreatedAtRoute("GetSchedule", new { controller = "Schedules", id = schedule.Id }, schedule);
//    return result;
//}

//[HttpPut("{id}")]
//public IActionResult Put(int id, [FromBody]ScheduleViewModel schedule)
//{
//    if (!ModelState.IsValid)
//    {
//        return BadRequest(ModelState);
//    }

//    Schedule _scheduleDb = clientRepository.GetSingle(id);

//    if (_scheduleDb == null)
//    {
//        return NotFound();
//    }
//    else
//    {
//        _scheduleDb.Title = schedule.Title;
//        _scheduleDb.Location = schedule.Location;
//        _scheduleDb.Description = schedule.Description;
//        _scheduleDb.Status = (ScheduleStatus)Enum.Parse(typeof(ScheduleStatus), schedule.Status);
//        _scheduleDb.Type = (ScheduleType)Enum.Parse(typeof(ScheduleType), schedule.Type);
//        _scheduleDb.TimeStart = schedule.TimeStart;
//        _scheduleDb.TimeEnd = schedule.TimeEnd;

//        // Remove current attendees
//        _attendeeRepository.DeleteWhere(a => a.ScheduleId == id);

//        foreach (var userId in schedule.Attendees)
//        {
//            _scheduleDb.Attendees.Add(new Attendee { ScheduleId = id, UserId = userId });
//        }

//        clientRepository.Commit();
//    }

//    schedule = Mapper.Map<Schedule, ScheduleViewModel>(_scheduleDb);

//    return new NoContentResult();
//}

//[HttpDelete("{id}", Name = "RemoveSchedule")]
//public IActionResult Delete(int id)
//{
//    Schedule _scheduleDb = clientRepository.GetSingle(id);

//    if (_scheduleDb == null)
//    {
//        return new NotFoundResult();
//    }
//    else
//    {
//        _attendeeRepository.DeleteWhere(a => a.ScheduleId == id);
//        clientRepository.Delete(_scheduleDb);

//        clientRepository.Commit();

//        return new NoContentResult();
//    }
//}

//[HttpDelete("{id}/removeattendee/{attendee}")]
//public IActionResult Delete(int id, int attendee)
//{
//    Schedule _scheduleDb = clientRepository.GetSingle(id);

//    if (_scheduleDb == null)
//    {
//        return new NotFoundResult();
//    }
//    else
//    {
//        _attendeeRepository.DeleteWhere(a => a.ScheduleId == id && a.UserId == attendee);

//        _attendeeRepository.Commit();

//        return new NoContentResult();
//    }
//}
//   }
//}

