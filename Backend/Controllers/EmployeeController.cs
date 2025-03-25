using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : Controller
    {
        private readonly AppDbContext _context;
        public EmployeeController(AppDbContext context) 
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();

        }
        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee updatedEmployee)
        //{
        //    if (id != updatedEmployee.EmpID)
        //    {
        //        return BadRequest("Employee ID mismatch");
        //    }

        //    var employee = await _context.Employees.FindAsync(id);

        //    if (employee == null)
        //    {
        //        return NotFound("Employee not found");
        //    }


        //    employee.EmpName = updatedEmployee.EmpName;
        //    employee.Age = updatedEmployee.Age;
        //    employee.Email = updatedEmployee.Email;
        //    employee.DOB = updatedEmployee.DOB;
        //    employee.Phno = updatedEmployee.Phno;


        //    await _context.SaveChangesAsync();

        //    return Ok("Employee updated successfully");
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee updatedEmployee)
        {
            if (id != updatedEmployee.EmpID)
            {
                return BadRequest(new { message = "Employee ID mismatch" });
            }

            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            // Update employee fields
            employee.EmpName = updatedEmployee.EmpName;
            employee.Age = updatedEmployee.Age;
            employee.Email = updatedEmployee.Email;
            employee.DOB = updatedEmployee.DOB;
            employee.Phno = updatedEmployee.Phno;

            await _context.SaveChangesAsync();

            return Ok(employee); // Return the updated employee as JSON
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound("not found");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok("employee deleted successfully");
        }



    }
}
