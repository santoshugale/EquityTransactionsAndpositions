using AngularDotNetCoreFullStackWebApplication.Server.Data;
using AngularDotNetCoreFullStackWebApplication.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNetCoreFullStackWebApplication.Server.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly TransactionContext _context;

        public TransactionRepository(TransactionContext context)
        {
            _context = context;
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            await _context.Transactions.AddAsync(transaction);
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            return await _context.Transactions.ToListAsync();
        }

        public void RemoveTransaction(Transaction transaction)
        {
            var oldTransaction = _context.Transactions.SingleOrDefault((t) => t.TradeID == transaction.TradeID);
            if (oldTransaction != null)
            {
                _context.Transactions.Remove(oldTransaction);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
