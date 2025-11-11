using System.ComponentModel.DataAnnotations;

namespace apixh.DTOs
{
    public class MajorDTO
    {
        [Required]
        public string MajorCode { get; set; } = string.Empty;

        public string? MajorName { get; set; }

        public string? Field { get; set; }

        public string? Description { get; set; }
    }
}
