//using Microsoft.AspNetCore.Mvc;

//namespace Backend.Controllers
//{
//    public class TravelController : Controller
//    {
//        public IActionResult Index()
//        {
//            return View();
//        }
//    }
//}


using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TravelController : Controller
    {
        private readonly AppDbContext _context;

        public TravelController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Travel>> GetTravels()
        {
            return await _context.Travel.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Travel>> GetTravelById(int id)
        {
            var travel = await _context.Travel.FindAsync(id);
            if (travel == null)
            {
                return NotFound("Travel record not found");
            }
            return Ok(travel);
        }


        //[HttpPut("{empId}")]
        //public async Task<IActionResult> UpdateTravel(int empId, [FromBody] Travel updatedTravel)
        //{
        //    if (empId != updatedTravel.EmpId)
        //    {
        //        return BadRequest("Employee ID mismatch");
        //    }

        //    var travel = await _context.Travel.FirstOrDefaultAsync(t => t.EmpId == empId);
        //    if (travel == null)
        //    {
        //        return NotFound("Travel record not found");
        //    }

        //    // Update fields
        //    travel.HomeAddress = updatedTravel.HomeAddress;
        //    travel.ShiftTime = updatedTravel.ShiftTime;

        //    await _context.SaveChangesAsync();
        //    return Ok("Travel record updated successfully");
        //}
        [HttpPut("{empId}")]
        public async Task<IActionResult> UpdateTravel(int empId, [FromBody] Travel updatedTravel)
        {
            Console.WriteLine($" API Hit: UpdateTravel called with empId: {empId}");
            Console.WriteLine($" Received Data: EmpId: {updatedTravel.EmpId}, Address: {updatedTravel.HomeAddress}, Shift: {updatedTravel.ShiftTime}");
            if (updatedTravel == null)
            {
                return BadRequest(new { message = "Invalid request payload. No data received." });
            }

            if (empId != updatedTravel.EmpId)
            {
                return BadRequest(new { message = "Employee ID mismatch.", sentEmpId = empId, receivedEmpId = updatedTravel.EmpId });
            }

            var travel = await _context.Travel.FirstOrDefaultAsync(t => t.EmpId == empId);
            if (travel == null)
            {
                return NotFound(new { message = "Travel record not found." });
            }

            try
            {
                travel.HomeAddress = updatedTravel.HomeAddress;
                travel.ShiftTime = updatedTravel.ShiftTime;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Travel record updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error saving changes", error = ex.Message });
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravel(int id)
        {
            var travel = await _context.Travel.FindAsync(id);
            if (travel == null)
            {
                return NotFound("Travel record not found");
            }

            _context.Travel.Remove(travel);
            await _context.SaveChangesAsync();
            return Ok("Travel record deleted successfully");
        }
    }
}
