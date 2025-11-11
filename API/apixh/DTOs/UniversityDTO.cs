using System.ComponentModel.DataAnnotations;

namespace apixh.DTOs
{
    public class UniversityDTO
    {
        [Required]
        public string UniversityCode { get; set; } = string.Empty;

        public string? UniversityName { get; set; }

        public string? Region { get; set; }

        public string? Address { get; set; }

        public int? Ranking { get; set; }

        public decimal? AdmissionScore { get; set; }

        public decimal? TuitionFee { get; set; }
    }
}
