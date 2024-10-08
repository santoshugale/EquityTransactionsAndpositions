using AngularDotNetCoreFullStackWebApplication.Server.Models;
using AngularDotNetCoreFullStackWebApplication.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularDotNetCoreFullStackWebApplication.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PositionsController : ControllerBase
    {
        private readonly ILogger<PositionsController> _logger;
        private readonly IPositionService _positionsService;
        private readonly RequestService _requestService;

        public PositionsController(
            ILogger<PositionsController> logger,
            IPositionService positionsService,
            RequestService requestService)
        {
            _logger = logger;
            _positionsService = positionsService;
            _requestService = requestService;
        }

        [HttpGet]
        public async Task<IEnumerable<Position>> GetTransactions()
        {
            _requestService.RequestCount++;
            return await _positionsService.GetPositionsAsync().ConfigureAwait(false);
        }
    }
}
