using AngularDotNetCoreFullStackWebApplication.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNetCoreFullStackWebApplication.Server.Data
{
    public class TransactionContext : DbContext
    {
        public TransactionContext(DbContextOptions<TransactionContext> options)
            : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
