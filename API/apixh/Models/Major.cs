using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apixh.Models
{
    [Table("Majors")]
    public class Major
    {
        [Key]
        [MaxLength(50)]
        public string MajorCode { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? MajorName { get; set; }

        [MaxLength(100)]
        public string? Field { get; set; }

        public string? Description { get; set; }

        public ICollection<UniversityMajor> UniversityMajors { get; set; } = new List<UniversityMajor>();
        public ICollection<TrendStats> TrendStatistics { get; set; } = new List<TrendStats>();
        public ICollection<MarketAnalysis> MarketAnalyses { get; set; } = new List<MarketAnalysis>();
    }
}
