using System.ComponentModel.DataAnnotations;

namespace AngularDotNetCoreFullStackWebApplication.Server.Models
{
    public class Position
    {
        [Key]
        public string SecurityCode { get; set; }
        public int Quantity { get; set; }
    }
}
