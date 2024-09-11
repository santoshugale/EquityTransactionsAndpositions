using Microsoft.EntityFrameworkCore;
using AngularDotNetCoreFullStackWebApplication.Server.Data;
using AngularDotNetCoreFullStackWebApplication.Server.Models;

namespace AngularDotNetCoreFullStackWebApplication.Server.Services
{
    public class PositionService : IPositionService
    {
        private readonly PositionsContext _context;

        public PositionService(PositionsContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _context.Positions.ToListAsync();
        }
    }

}
