using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apixh.Models
{
    [Table("TrendStatistics")]
    public class TrendStats
    {   
        [Key]
        [MaxLength(50)]
        public string TrendCode { get; set; } = string.Empty;

        [MaxLength(50)]
        public string MajorCode { get; set; } = string.Empty;

        public Major? Major { get; set; }

        public int Year { get; set; }
        public int? TotalQuota { get; set; }
        public int? RankOrder { get; set; }
        public double? GrowthRate { get; set; }
    }
}
