using AngularDotNetCoreFullStackWebApplication.Server.Models;

namespace AngularDotNetCoreFullStackWebApplication.Server.Repositories
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetTransactionsAsync();
        Task AddTransactionAsync(Transaction transaction);
        Task SaveChangesAsync();
        void RemoveTransaction(Transaction transaction);
        // Other repository methods...
    }
}
