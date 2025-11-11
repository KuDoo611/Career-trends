using apixh.Data;
using apixh.DTOs;
using apixh.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace apixh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MajorsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public MajorsController(AppDbContext db) => _db = db;

        // GET list
        [HttpGet("list")]
        public async Task<IActionResult> GetList()
        {
            var list = await _db.Majors.AsNoTracking().ToListAsync();
            var dtos = list.Select(m => new MajorDTO
            {
                MajorCode = m.MajorCode,
                MajorName = m.MajorName,
                Field = m.Field,
                Description = m.Description
            });
            return Ok(dtos);
        }

        // GET create (template) - return an empty DTO / template useful for front-end forms
        [HttpGet("create")]
        public IActionResult GetCreate()
        {
            var template = new MajorDTO
            {
                MajorCode = string.Empty,
                MajorName = string.Empty,
                Field = string.Empty,
                Description = string.Empty
            };
            return Ok(template);
        }

        // POST create
        [HttpPost("create")]
        public async Task<IActionResult> PostCreate([FromBody] Major major)
        {
            if (major == null || string.IsNullOrWhiteSpace(major.MajorCode))
                return BadRequest("Major payload is invalid or missing MajorCode.");

            // prevent duplicate key
            var exists = await _db.Majors.FindAsync(major.MajorCode);
            if (exists != null)
                return Conflict(new { message = "A major with the same MajorCode already exists." });

            _db.Majors.Add(major);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetByCode), new { code = major.MajorCode }, major);
        }

        // GET by code
        [HttpGet("{code}")]
        public async Task<IActionResult> GetByCode(string code)
        {
            var m = await _db.Majors.FindAsync(code);
            if (m == null) return NotFound();
            var dto = new MajorDTO
            {
                MajorCode = m.MajorCode,
                MajorName = m.MajorName,
                Field = m.Field,
                Description = m.Description
            };
            return Ok(dto);
        }

        // GET delete (per your request: delete via GET endpoint)
        // Note: it's more RESTful to use HTTP DELETE; keep this GET for compatibility/demo only.
        [HttpGet("delete/{code}")]
        public async Task<IActionResult> GetDelete(string code)
        {
            var m = await _db.Majors.FindAsync(code);
            if (m == null) return NotFound();
            _db.Majors.Remove(m);
            await _db.SaveChangesAsync();
            return Ok(new { message = $"Major '{code}' deleted." });
        }
    }
}
