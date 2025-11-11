using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apixh.Models
{
    [Table("Universities")]
    public class University
    {
        [Key]
        [MaxLength(50)]
        public string UniversityCode { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? UniversityName { get; set; }

        [MaxLength(100)]
        public string? Region { get; set; }

        [MaxLength(200)]
        public string? Address { get; set; }

        public int? Ranking { get; set; }

        [Column(TypeName = "decimal(4,2)")]
        public decimal? AdmissionScore { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? TuitionFee { get; set; }

        public ICollection<UniversityMajor> UniversityMajors { get; set; } = new List<UniversityMajor>();
    }
}
