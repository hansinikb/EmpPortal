using System.ComponentModel.DataAnnotations;

namespace Backend
{
    public class Employee
    {
        [Key]
        public int EmpID { get; set; }
        public string EmpName { get; set; }
        public int Age { get; set; }
        public string Email {  get; set; }
        public DateTime DOB {  get; set; }
        public string Phno {  get; set; }
    }
}
