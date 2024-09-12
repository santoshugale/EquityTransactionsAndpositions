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
        private readonly RequestService _requestService;

        public TransactionController(
            ILogger<TransactionController> logger,
            TransactionService transactionService,
            RequestService requestService)
        {
            _logger = logger;
            _transactionService = transactionService;
            _requestService = requestService;
        }

        [HttpGet]
        public async Task<IEnumerable<Transaction>> GetTransactions()
        {
            _requestService.RequestCount++;
            return await _transactionService.GetTransactionsAsync().ConfigureAwait(false);
        }

        [HttpPost]
        public async Task<CreatedResult> AddTransaction(Transaction transaction)
        {
            _requestService.RequestCount++;
            await _transactionService.AddTransactionAsync(transaction).ConfigureAwait(false);
            return Created();
        }
    }
}
