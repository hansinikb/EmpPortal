using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend
{
    public class Canteen
    {
        [Key]
        public int ItemId { get; set; }


        public string Counter { get; set; }


        public string ItemName { get; set; }

        public decimal Price { get; set; }
    }
}
