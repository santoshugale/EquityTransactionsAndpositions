using AngularDotNetCoreFullStackWebApplication.Server.Models;

namespace AngularDotNetCoreFullStackWebApplication.Server.Repositories
{
    public interface IPositionRepository
    {
        Task AddPositionAsync(Position position);
        Task<IEnumerable<Position>> GetPositionsAsync();
        Task SaveChangesAsync();
    }
}
