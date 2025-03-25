
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend
{
    public class Library
    {
        [Key]
        public int BookId { get; set; }
        public string BookName { get; set; }

        public string Category { get; set; }

        public string Author { get; set; }
    }
}


