using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AttendanceController : Controller
    {
        private readonly AppDbContext _context;
        public AttendanceController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Attendance>> GetAttendances()
        {
            return await _context.Attendances.ToListAsync();

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendance(int id, [FromBody] Attendance updatedAttendance)
        {
            if (id != updatedAttendance.AttendanceID)
            {
                return BadRequest("attendance ID not matching");
            }

            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
            {
                return NotFound("attendance not found");
            }


            //attendance.EmpID = updatedAttendance.EmpID;
            attendance.AttDate = updatedAttendance.AttDate;
            attendance.InTime = updatedAttendance.InTime;
            attendance.OutTime = updatedAttendance.OutTime;


            await _context.SaveChangesAsync();

            return Ok("attendance updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
            {
                return NotFound("not found");
            }

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();

            return Ok("attendance deleted successfully");
        }



    }
}
