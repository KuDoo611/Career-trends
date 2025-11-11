using apixh.Data;
using apixh.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apixh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarketAnalysisController : ControllerBase
    {
        private readonly AppDbContext _db;
        public MarketAnalysisController(AppDbContext db) => _db = db;

        // GET api/marketanalysis
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.MarketAnalysis
                .Include(a => a.Major)
                .Include(a => a.CreatedByUser)
                .AsNoTracking()
                .ToListAsync();

            return Ok(list.Select(a => new {
                a.AnalysisCode,
                a.MajorCode,
                MajorName = a.Major?.MajorName,
                a.Year,
                a.DemandIndex,
                a.EmploymentRate,
                a.SalaryLevel,
                a.AdminNote,
                a.CreatedBy,
                CreatedByName = a.CreatedByUser?.FullName,
                a.CreatedAt
            }));
        }

        // POST api/marketanalysis
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MarketAnalysis analysis)
        {
            // In production: check user role (Admin)
            _db.MarketAnalysis.Add(analysis);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { code = analysis.AnalysisCode }, analysis);
        }
    }
}
