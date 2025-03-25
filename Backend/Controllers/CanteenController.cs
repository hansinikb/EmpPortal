using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CanteenController : Controller
    {
        private readonly AppDbContext _context;

        public CanteenController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Canteen>> GetItems()
        {
            return await _context.Canteen.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Canteen>> GetItemById(int id)
        {
            var item = await _context.Canteen.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item not found");
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] Canteen newItem)
        {
            if (newItem == null)
            {
                return BadRequest("Invalid item data");
            }

            _context.Canteen.Add(newItem);
            await _context.SaveChangesAsync();
            return Ok("Item added successfully");
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateItem(int id, [FromBody] Canteen updatedItem)
        //{
        //    if (id != updatedItem.ItemId)
        //    {
        //        return BadRequest("Item ID mismatch");
        //    }

        //    var item = await _context.Canteen.FindAsync(id);
        //    if (item == null)
        //    {
        //        return NotFound("Item not found");
        //    }

        //    item.Counter = updatedItem.Counter;
        //    item.ItemName = updatedItem.ItemName;
        //    item.Price = updatedItem.Price;

        //    await _context.SaveChangesAsync();
        //    return Ok("Item updated successfully");
        //}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] Canteen updatedItem)
        {
            Console.WriteLine($"API Hit: UpdateItem called with id: {id}");
            Console.WriteLine($"Received Data: ItemId: {updatedItem.ItemId}, Counter: {updatedItem.Counter}, ItemName: {updatedItem.ItemName}, Price: {updatedItem.Price}");

            if (updatedItem == null)
            {
                return BadRequest("Invalid request payload. No data received.");
            }

            if (id != updatedItem.ItemId)
            {
                return BadRequest("Item ID mismatch.");
            }

            var item = await _context.Canteen.FirstOrDefaultAsync(i => i.ItemId == id);
            if (item == null)
            {
                return NotFound("Item not found.");
            }

            try
            {
                // Update item fields
                item.Counter = updatedItem.Counter;
                item.ItemName = updatedItem.ItemName;
                item.Price = updatedItem.Price;

                await _context.SaveChangesAsync();
                return Ok(item); // Return the updated item as JSON
            }
            catch (Exception ex)
            {
                return BadRequest($"Error saving changes: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Canteen.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item not found");
            }

            _context.Canteen.Remove(item);
            await _context.SaveChangesAsync();
            return Ok("Item deleted successfully");
        }
    }
}

