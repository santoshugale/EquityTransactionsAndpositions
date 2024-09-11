using AngularDotNetCoreFullStackWebApplication.Server.Models;
using AngularDotNetCoreFullStackWebApplication.Server.Repositories;

namespace AngularDotNetCoreFullStackWebApplication.Server.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IPositionRepository _positionRepository;

        public TransactionService(
            ITransactionRepository transactionRepository,
            IPositionRepository positionRepository)
        {
            _transactionRepository = transactionRepository;
            _positionRepository = positionRepository;
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            switch (transaction.TradeAction)
            {
                case TradeAction.Insert:
                    await InsertTrade(transaction);
                    break;
                case TradeAction.Update:
                    await UpdateTrade(transaction);
                    break;
                case TradeAction.Cancel:
                    await CancelTrade(transaction);
                    break;
            }


            await _transactionRepository.SaveChangesAsync();
            await _positionRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsAsync()
        {
            return await _transactionRepository.GetTransactionsAsync();
        }

        private async Task InsertTrade(Transaction transaction)
        {
            await _transactionRepository.AddTransactionAsync(transaction).ConfigureAwait(false);
            var updatedQuantity = transaction.TradeType == TradeType.Buy ? transaction.Quantity : -transaction.Quantity;
            await UpdatePosition(transaction, updatedQuantity);
        }

        private async Task UpdateTrade(Transaction transaction)
        {
            var transactions = await _transactionRepository.GetTransactionsAsync();

            var oldTransaction = transactions.SingleOrDefault((t) => t.TradeID == transaction.TradeID);
            if (oldTransaction != null)
            {
                var quantity = oldTransaction.TradeType == TradeType.Buy ? -oldTransaction.Quantity : transaction.Quantity;
                await UpdatePosition(oldTransaction, quantity);
                await _transactionRepository.AddTransactionAsync(transaction);
                quantity = transaction.TradeType == TradeType.Buy ? transaction.Quantity : -transaction.Quantity;
                await UpdatePosition(transaction, quantity);
            }
        }

        private async Task CancelTrade(Transaction transaction)
        {
            var transactions = await _transactionRepository.GetTransactionsAsync();
            var oldTransaction = transactions.SingleOrDefault((t) => t.TradeID == transaction.TradeID);
            if (oldTransaction != null)
            {
                var quantity = oldTransaction.TradeType == TradeType.Buy ? -oldTransaction.Quantity : oldTransaction.Quantity;
                await UpdatePosition(transaction, quantity);
                _transactionRepository.RemoveTransaction(oldTransaction);
            }
        }

        private async Task UpdatePosition(Transaction transaction, int quantityChange)
        {
            var positions = await _positionRepository.GetPositionsAsync();
            var position = positions.SingleOrDefault((position) => position.SecurityCode == transaction.SecurityCode);
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
                await _positionRepository.AddPositionAsync(position);
            }
        }
    }
}
