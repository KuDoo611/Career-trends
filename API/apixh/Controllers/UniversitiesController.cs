using apixh.Data;
using apixh.DTOs;
using apixh.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apixh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UniversitiesController : ControllerBase
    {
        private readonly AppDbContext _db;
        public UniversitiesController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Universities.AsNoTracking().ToListAsync();
            var dtos = list.Select(u => new UniversityDTO {
                UniversityCode = u.UniversityCode,
                UniversityName = u.UniversityName,
                Region = u.Region,
                Address = u.Address,
                Ranking = u.Ranking,
                AdmissionScore = u.AdmissionScore,
                TuitionFee = u.TuitionFee
            });
            return Ok(dtos);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> Get(string code)
        {
            var uni = await _db.Universities.FindAsync(code);
            if (uni == null) return NotFound();
            var dto = new UniversityDTO {
                UniversityCode = uni.UniversityCode,
                UniversityName = uni.UniversityName,
                Region = uni.Region,
                Address = uni.Address,
                Ranking = uni.Ranking,
                AdmissionScore = uni.AdmissionScore,
                TuitionFee = uni.TuitionFee
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] University uni)
        {
            _db.Universities.Add(uni);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { code = uni.UniversityCode }, uni);
        }
    }
}
