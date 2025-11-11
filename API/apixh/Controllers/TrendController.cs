using apixh.DTOs;
using apixh.Services;
using Microsoft.AspNetCore.Mvc;

namespace apixh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrendController : ControllerBase
    {
        private readonly ITrendService _trendService;
        public TrendController(ITrendService trendService) => _trendService = trendService;

        // GET api/trend/top?year=2025&topN=10
        [HttpGet("top")]
        public async Task<IActionResult> GetTop([FromQuery] int year = 2025, [FromQuery] int topN = 10)
        {
            var data = await _trendService.GetTopMajorsAsync(year, topN);
            var dto = data.Select(t => new {
                t.TrendCode,
                t.MajorCode,
                MajorName = t.Major?.MajorName,
                t.Year,
                t.TotalQuota,
                t.RankOrder,
                t.GrowthRate
            });

            return Ok(dto);
        }
    }
}
