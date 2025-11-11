using apixh.Data;
using apixh.Models;
using Microsoft.EntityFrameworkCore;

namespace apixh.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _db;
        public UserService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _db.Users.AsNoTracking().ToListAsync();
        }

        public async Task<User?> GetByCodeAsync(string userCode)
        {
            return await _db.Users.FindAsync(userCode);
        }

        public async Task<User> CreateAsync(User user)
        {
            // Validate email uniqueness (case-insensitive)
            if (!string.IsNullOrWhiteSpace(user.Email))
            {
                var exists = await _db.Users.AnyAsync(u => u.Email != null && u.Email.ToLower() == user.Email.ToLower());
                if (exists)
                {
                    throw new InvalidOperationException("EmailAlreadyExists");
                }
            }

            if (string.IsNullOrWhiteSpace(user.UserCode)) user.UserCode = Guid.NewGuid().ToString();

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return user;
        }
    }
}
