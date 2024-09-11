using AngularDotNetCoreFullStackWebApplication.Server.Models;

namespace AngularDotNetCoreFullStackWebApplication.Server.Services
{
    public interface IPositionService
    {
        Task<IEnumerable<Position>> GetPositionsAsync();
    }
}
