using AngularDotNetCoreFullStackWebApplication.Server.Models;
using AngularDotNetCoreFullStackWebApplication.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AngularDotNetCoreFullStackWebApplication.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly ITransactionService _transactionService;
        private readonly RequestService _requestService;

        public TransactionController(
            ILogger<TransactionController> logger,
            ITransactionService transactionService,
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

        [HttpPost("FileUpload")]
        public async Task<ActionResult> TransactionFileUpload(IFormFile file)
        {
            _requestService.RequestCount++;

            if (file == null || file.Length <= 0 || !Path.GetExtension(file.FileName).Equals(".json", StringComparison.CurrentCultureIgnoreCase))
            {
                return BadRequest("Please upload valid json file");
            }

            var temporaryFilePath = Path.Combine(@"E:\", file.FileName);

            using (var stream = new FileStream(temporaryFilePath, FileMode.Create))
            {
                await file.CopyToAsync(stream); // Stream the file content
            }
            string content = System.IO.File.ReadAllText(temporaryFilePath);
            var transactions = JsonConvert.DeserializeObject<Transaction[]>(content);
            // TODO - save this transaction in db
            return Ok();
        }
    }
}
