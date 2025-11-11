using apixh.Data;
using apixh.DTOs;
using apixh.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apixh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MajorsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public MajorsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Majors.AsNoTracking().ToListAsync();
            var dtos = list.Select(m => new MajorDTO {
                MajorCode = m.MajorCode,
                MajorName = m.MajorName,
                Field = m.Field,
                Description = m.Description
            });
            return Ok(dtos);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> Get(string code)
        {
            var m = await _db.Majors.FindAsync(code);
            if (m == null) return NotFound();
            var dto = new MajorDTO {
                MajorCode = m.MajorCode,
                MajorName = m.MajorName,
                Field = m.Field,
                Description = m.Description
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Major major)
        {
            _db.Majors.Add(major);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { code = major.MajorCode }, major);
        }
    }
}
