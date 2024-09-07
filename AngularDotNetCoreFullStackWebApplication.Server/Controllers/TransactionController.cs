using AngularDotNetCoreFullStackWebApplication.Server.Data;
using AngularDotNetCoreFullStackWebApplication.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNetCoreFullStackWebApplication.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly PositionsContext _positionsContext;
        private readonly TransactionContext _transactionsContext;

        public TransactionController(
            ILogger<TransactionController> logger,
            PositionsContext positionsContext,
            TransactionContext context)
        {
            _logger = logger;
            _positionsContext = positionsContext;
            _transactionsContext = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Transaction>> GetTransactions()
        {
            return await _transactionsContext.Transactions.ToListAsync();
        }

        [HttpPost]
        public async Task<CreatedResult> AddTransaction(Transaction transaction)
        {
            switch (transaction.TradeAction)
            {
                case TradeAction.Insert:
                    InsertTrade(transaction);
                    break;
                case TradeAction.Update:
                    UpdateTrade(transaction);
                    break;
                case TradeAction.Cancel:
                    CancelTrade(transaction);
                    break;
            }


            await _transactionsContext.SaveChangesAsync();
            await _positionsContext.SaveChangesAsync();
            return Created();
        }

        private void InsertTrade(Transaction transaction)
        {
            _transactionsContext.Transactions.Add(transaction);
            var updatedQuantity = transaction.TradeType == TradeType.Buy ? transaction.Quantity : -transaction.Quantity;
            UpdatePosition(transaction, updatedQuantity);
        }

        private void UpdateTrade(Transaction transaction)
        {
            var oldTransaction = _transactionsContext.Transactions.SingleOrDefault((t) => t.TradeID == transaction.TradeID);

            if (oldTransaction != null)
            {
                var quantity = oldTransaction.TradeType == TradeType.Buy ? -oldTransaction.Quantity : transaction.Quantity;
                UpdatePosition(oldTransaction, quantity);
                _transactionsContext.Transactions.Add(transaction);
                quantity = transaction.TradeType == TradeType.Buy ? transaction.Quantity : -transaction.Quantity;
                UpdatePosition(transaction, quantity);
            }
        }

        private void CancelTrade(Transaction transaction)
        {
            var oldTransaction = _transactionsContext.Transactions.SingleOrDefault((t) => t.TradeID == transaction.TradeID);
            if (oldTransaction != null)
            {
                var quantity = oldTransaction.TradeType == TradeType.Buy ? -oldTransaction.Quantity : oldTransaction.Quantity;
                UpdatePosition(transaction, quantity);
                _transactionsContext.Transactions.Remove(oldTransaction);
            }
        }

        private void UpdatePosition(Transaction transaction, int quantityChange)
        {
            var position = _positionsContext.Positions.SingleOrDefault((position) => position.SecurityCode == transaction.SecurityCode);
            if (position != null)
            {
                position.Quantity += quantityChange;
            }
            else
            {
                position = new Position()
                {
                    SecurityCode = transaction.SecurityCode,
                    Quantity = quantityChange,
                };
                _positionsContext.Positions.Add(position);
            }
        }
    }
}
