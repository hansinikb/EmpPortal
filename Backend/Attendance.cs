using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Backend
{
    public class Attendance
    {
        [Key]
        public int AttendanceID { get; set; }
        [ForeignKey("Employee")]
        [Required] 
        [JsonPropertyName("empId")] 
        public int EmpID { get; set; }
        public DateOnly AttDate { get; set; }
        public DateTime InTime { get; set; }
        public DateTime OutTime { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
    }
}

