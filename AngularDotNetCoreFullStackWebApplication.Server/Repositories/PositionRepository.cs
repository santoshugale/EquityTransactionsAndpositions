using Microsoft.EntityFrameworkCore;
using AngularDotNetCoreFullStackWebApplication.Server.Data;
using AngularDotNetCoreFullStackWebApplication.Server.Models;

namespace AngularDotNetCoreFullStackWebApplication.Server.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly PositionsContext _context;

        public PositionRepository(PositionsContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _context.Positions.ToListAsync();
        }

        public async Task AddPositionAsync(Position position)
        {
            await _context.Positions.AddAsync(position);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }

}
