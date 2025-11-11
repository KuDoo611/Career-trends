using System.ComponentModel.DataAnnotations;

namespace apixh.DTOs
{
    public class TrendDTO
    {
        [Required]
        public string TrendCode { get; set; } = string.Empty;

        [Required]
        public string MajorCode { get; set; } = string.Empty;

        public int Year { get; set; }
        public int? TotalQuota { get; set; }
        public int? RankOrder { get; set; }
        public double? GrowthRate { get; set; }
    }
}
