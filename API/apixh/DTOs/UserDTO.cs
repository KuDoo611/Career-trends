using System;
using System.ComponentModel.DataAnnotations;

namespace apixh.DTOs
{
    // DTO dùng để trả về thông tin user (không trả password)
    public class UserDTO
    {
        [Required]
        public string UserCode { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

        public DateTime CreatedAt { get; set; }
    }
}
