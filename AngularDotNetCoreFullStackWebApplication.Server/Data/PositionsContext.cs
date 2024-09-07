using AngularDotNetCoreFullStackWebApplication.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNetCoreFullStackWebApplication.Server.Data
{
    public class PositionsContext : DbContext
    {
        public PositionsContext(DbContextOptions<PositionsContext> options)
            : base(options) { }

        public DbSet<Position> Positions { get; set; }
    }
}
