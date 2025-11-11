using System.ComponentModel.DataAnnotations;

namespace apixh.Models
{
    public class MarketAnalysis
    {
        [Key]
        public string AnalysisCode { get; set; } = Guid.NewGuid().ToString();
        // Foreign key to Major
        public string MajorCode { get; set; } = string.Empty;
        public Major? Major { get; set; }

        public int Year { get; set; }

        // Example analysis metrics
        public double? DemandIndex { get; set; }
        public double? EmploymentRate { get; set; }
        public string? SalaryLevel { get; set; }

        // Admin notes and content
        public string? AdminNote { get; set; }
    [System.ComponentModel.DataAnnotations.Schema.NotMapped]
    public string AnalysisContent { get; set; } = string.Empty;

        // Creator info
        public string? CreatedBy { get; set; }
        public User? CreatedByUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
