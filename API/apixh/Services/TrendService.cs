using apixh.Data;
using apixh.Models;
using Microsoft.EntityFrameworkCore;

namespace apixh.Services
{
    public class TrendService : ITrendService
    {
        private readonly AppDbContext _db;
        public TrendService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<TrendStats>> GetTopMajorsAsync(int year, int topN = 10)
        {
            return await _db.TrendStats
                .Where(t => t.Year == year)
                .OrderByDescending(t => t.TotalQuota ?? 0)
                .Take(topN)
                .Include(t => t.Major)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
