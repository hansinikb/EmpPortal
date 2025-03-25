using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend
{
    public class Travel
    {
        [Key]
        public int EmpId { get; set; }

        public string HomeAddress { get; set; }

        public TimeSpan ShiftTime { get; set; }

        [ForeignKey("EmpId")]
        public Employee? Employee { get; set; }
    }
}
