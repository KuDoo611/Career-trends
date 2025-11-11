using apixh.Data;
using apixh.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apixh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdmissionController : ControllerBase
    {
        private readonly AppDbContext _db;
        public AdmissionController(AppDbContext db) => _db = db;

        // GET api/admission/{year}
        [HttpGet("{year}")]
        public async Task<IActionResult> GetByYear(int year)
        {
            var data = await _db.UniversityMajors
                .Include(um => um.University)
                .Include(um => um.Major)
                .Where(um => um.Year == year)
                .AsNoTracking()
                .ToListAsync();

            return Ok(data.Select(um => new {
                um.UMCode,
                UniversityCode = um.UniversityCode,
                UniversityName = um.University?.UniversityName,
                MajorCode = um.MajorCode,
                MajorName = um.Major?.MajorName,
                um.Quota_2023,
                um.Quota_2024,
                um.Quota_2025,
                um.Year
            }));
        }

        // POST add/update UM record
        [HttpPost]
        public async Task<IActionResult> Upsert([FromBody] UniversityMajor um)
        {
            var existing = await _db.UniversityMajors.FindAsync(um.UMCode);
            if (existing == null)
            {
                _db.UniversityMajors.Add(um);
            }
            else
            {
                // update fields
                existing.Quota_2023 = um.Quota_2023;
                existing.Quota_2024 = um.Quota_2024;
                existing.Quota_2025 = um.Quota_2025;
                existing.Year = um.Year;
            }
            await _db.SaveChangesAsync();
            return Ok(um);
        }
    }
}
