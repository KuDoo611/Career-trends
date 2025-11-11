using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apixh.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [MaxLength(50)]
        public string UserCode { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? FullName { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(100)]
        public string? Password { get; set; }   // Plain text per requirement (not secure)

        [MaxLength(20)]
        public string? Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
