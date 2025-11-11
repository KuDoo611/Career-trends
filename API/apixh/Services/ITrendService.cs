using apixh.Models;

namespace apixh.Services
{
    public interface ITrendService
    {
        Task<IEnumerable<TrendStats>> GetTopMajorsAsync(int year, int topN = 10);
    }
}
