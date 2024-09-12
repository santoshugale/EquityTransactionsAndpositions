using Microsoft.AspNetCore.Mvc;
using AngularDotNetCoreFullStackWebApplication.Server.Models;
using AngularDotNetCoreFullStackWebApplication.Server.Services;

namespace AngularDotNetCoreFullStackWebApplication.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly TransactionService _transactionService;

        public TransactionController(
            ILogger<TransactionController> logger,
            TransactionService transactionService)
        {
            _logger = logger;
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IEnumerable<Transaction>> GetTransactions()
        {
            return await _transactionService.GetTransactionsAsync().ConfigureAwait(false);
        }

        [HttpPost]
        public async Task<CreatedResult> AddTransaction(Transaction transaction)
        {
            await _transactionService.AddTransactionAsync(transaction).ConfigureAwait(false);
            return Created();
        }
    }
}
