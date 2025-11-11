using apixh.Models;

namespace apixh.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByCodeAsync(string userCode);
        Task<User> CreateAsync(User user);
    }
}
