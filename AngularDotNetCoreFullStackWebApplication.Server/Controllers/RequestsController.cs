using AngularDotNetCoreFullStackWebApplication.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetCoreFullStackWebApplication.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly RequestService _requestService;

        public RequestsController(RequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpGet]
        public int GetRequestCount()
        {
            return _requestService.RequestCount++;
        }
    }
}
