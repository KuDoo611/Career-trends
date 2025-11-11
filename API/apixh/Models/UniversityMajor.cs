using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apixh.Models
{
    [Table("UniversityMajors")]
    public class UniversityMajor
    {
        [Key]
        [MaxLength(50)]
        public string UMCode { get; set; } = string.Empty;

        [MaxLength(50)]
        public string UniversityCode { get; set; } = string.Empty;

        [ForeignKey("UniversityCode")]
        public University? University { get; set; }

        [MaxLength(50)]
        public string MajorCode { get; set; } = string.Empty;

    [ForeignKey("MajorCode")]
    public Major? Major { get; set; }

        public int? Quota_2025 { get; set; }
        public int? Quota_2024 { get; set; }
        public int? Quota_2023 { get; set; }
        public int? Year { get; set; }
    }
}
