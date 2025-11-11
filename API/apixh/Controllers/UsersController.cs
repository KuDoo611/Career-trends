using apixh.DTOs;
using apixh.Models;
using apixh.Services;
using Microsoft.AspNetCore.Mvc;

namespace apixh.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _svc;
        public UsersController(IUserService svc) => _svc = svc;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _svc.GetAllAsync();
            var dtos = users.Select(u => new UserDTO {
                UserCode = u.UserCode,
                Name = u.FullName,
                Email = u.Email,
                Password = u.Password,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            });
            return Ok(dtos);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> Get(string code)
        {
            var user = await _svc.GetByCodeAsync(code);
            if (user == null) return NotFound();
            var dto = new UserDTO {
                UserCode = user.UserCode,
                Name = user.FullName,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Models.User user)
        {
            // Note: in production hash password and validate uniqueness
            try
            {
                var created = await _svc.CreateAsync(user);
                return CreatedAtAction(nameof(Get), new { code = created.UserCode }, created);
            }
            catch (InvalidOperationException ex) when (ex.Message == "EmailAlreadyExists")
            {
                return Conflict(new { message = "Email already exists" });
            }
        }
    }
}
