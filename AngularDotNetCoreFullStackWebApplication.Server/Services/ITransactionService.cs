using AngularDotNetCoreFullStackWebApplication.Server.Models;

namespace AngularDotNetCoreFullStackWebApplication.Server.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<Transaction>> GetTransactionsAsync();
        Task AddTransactionAsync(Transaction transaction);
    }
}
