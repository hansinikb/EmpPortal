
using Backend.Data;
//using global::Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LibraryController : Controller
    {
        private readonly AppDbContext _context;

        public LibraryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Library>> GetBooks()
        {
            return await _context.Library.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Library>> GetBookById(int id)
        {
            var book = await _context.Library.FindAsync(id);
            if (book == null)
            {
                return NotFound("book not found");
            }
            return Ok(book);
        }

        //[HttpPost]
        //public async Task<IActionResult> AddBook([FromBody] Library newBook)
        //{
        //    if (newBook == null)
        //    {
        //        return BadRequest("invalid book data");
        //    }

        //    _context.Library.Add(newBook);
        //    await _context.SaveChangesAsync();
        //    return Ok("Book added successfully");
        //}

        //1
        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateBook(int id, [FromBody] Library updatedBook)
        //{
        //    if (id != updatedBook.BookId)
        //    {
        //        return BadRequest("Book ID mismatch");
        //    }

        //    var book = await _context.Library.FindAsync(id);
        //    if (book == null)
        //    {
        //        return NotFound("Book not found");
        //    }

        //    //book.BookName = updatedBook.BookName;
        //    book.Category = updatedBook.Category;
        //    book.Author = updatedBook.Author;

        //    await _context.SaveChangesAsync();
        //    return Ok(new { message = "Book updated successfully" });
        //}
        //2
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Library updatedBook)
        {
            Console.WriteLine($"API Hit: UpdateBook called with id: {id}");
            Console.WriteLine($"Received Data: BookId: {updatedBook.BookId}, Category: {updatedBook.Category}, Author: {updatedBook.Author}");

            if (updatedBook == null)
            {
                return BadRequest("Invalid request payload. No data received.");
            }

            if (id != updatedBook.BookId)
            {
                return BadRequest("Book ID mismatch.");
            }

            var book = await _context.Library.FirstOrDefaultAsync(b => b.BookId == id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            try
            {
                book.BookName = updatedBook.BookName;
                book.Category = updatedBook.Category;
                book.Author = updatedBook.Author;

                await _context.SaveChangesAsync();
                return Ok(book); // Return only the updated book
            }
            catch (Exception ex)
            {
                return BadRequest($"Error saving changes: {ex.Message}");
            }
        }

        //3
        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateBook(int id, [FromBody] Library updatedBook)
        //{
        //    Console.WriteLine($"API Hit: UpdateBook called with id: {id}");
        //    Console.WriteLine($"Received Data: BookId: {updatedBook.BookId}, Category: {updatedBook.Category}, Author: {updatedBook.Author}");

        //    if (updatedBook == null)
        //    {
        //        return BadRequest(new { message = "Invalid request payload. No data received." });
        //    }

        //    if (id != updatedBook.BookId)
        //    {
        //        return BadRequest(new { message = "Book ID mismatch.", sentBookId = id, receivedBookId = updatedBook.BookId });
        //    }

        //    var book = await _context.Library.FirstOrDefaultAsync(b => b.BookId == id);
        //    if (book == null)
        //    {
        //        return NotFound(new { message = "Book not found." });
        //    }

        //    try
        //    {
        //        book.BookName = updatedBook.BookName;
        //        book.Category = updatedBook.Category;
        //        book.Author = updatedBook.Author;

        //        await _context.SaveChangesAsync();
        //        return Ok(new { message = "Book updated successfully", updatedBook = book });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { message = "Error saving changes", error = ex.Message });
        //    }
        //}



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Library.FindAsync(id);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            _context.Library.Remove(book);
            await _context.SaveChangesAsync();
            return Ok("Book deleted successfully");
        }
    }
}

