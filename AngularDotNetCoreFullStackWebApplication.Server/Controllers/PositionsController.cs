using AngularDotNetCoreFullStackWebApplication.Server.Data;
using AngularDotNetCoreFullStackWebApplication.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNetCoreFullStackWebApplication.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PositionsController : ControllerBase
    {
        private readonly ILogger<PositionsController> _logger;
        private readonly PositionsContext _context;

        public PositionsController(ILogger<PositionsController> logger,
            PositionsContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Position>> GetTransactions()
        {
            return await _context.Positions.ToListAsync();
        }

    }
}
