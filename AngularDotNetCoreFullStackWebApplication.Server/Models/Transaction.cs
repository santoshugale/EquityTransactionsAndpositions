using System.ComponentModel.DataAnnotations;

namespace AngularDotNetCoreFullStackWebApplication.Server.Models
{
    public class Transaction
    {
        public int TransactionID { get; set; }

        [Required]
        public int TradeID { get; set; }

        [Required]
        public int Version { get; set; }

        [Required]
        public string SecurityCode { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public TradeAction TradeAction { get; set; }

        [Required]
        public TradeType TradeType { get; set; }
    }
}
