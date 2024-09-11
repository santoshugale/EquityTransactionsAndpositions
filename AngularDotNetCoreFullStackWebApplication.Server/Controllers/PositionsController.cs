using AngularDotNetCoreFullStackWebApplication.Server.Data;
using AngularDotNetCoreFullStackWebApplication.Server.Models;
using AngularDotNetCoreFullStackWebApplication.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNetCoreFullStackWebApplication.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PositionsController : ControllerBase
    {
        private readonly ILogger<PositionsController> _logger;
        private readonly IPositionService _positionsService;

        public PositionsController(
            ILogger<PositionsController> logger,
            IPositionService positionsService)
        {
            _logger = logger;
            _positionsService = positionsService;
        }

        [HttpGet]
        public async Task<IEnumerable<Position>> GetTransactions()
        {
            return await _positionsService.GetPositionsAsync().ConfigureAwait(false);
        }
    }
}
