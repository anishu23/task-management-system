using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Enums;
using TaskManagementSystem.Interfaces;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Services;

public class UserService : IUserService
{
    private readonly TaskManagementSystemContext _context;
    private readonly IAuthenticationService _authService;

    public UserService(TaskManagementSystemContext context, IAuthenticationService authService)
    {
        _context = context;
        _authService = authService;
    }

    public async Task<UserDTO> CreateUser(User user)
    {
        var userInDB = _context.Users.FirstOrDefault(user => user.email == user.email);
        if (userInDB == null)
        {
            var passwordHash = _authService.CalculatePasswordHash(user, user.password);
            var stringPasswordHash = BitConverter.ToString(passwordHash).Replace("-", "").ToLower();
            user.password = stringPasswordHash;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDTO
            {
                id = user.id,
                username = user.username,
                email = user.email,
                role = user.role,
                createdAt = user.createdAt
            };
        }
        throw new Exception("User already exists!");
    }

    public async Task<UserDTO> GetUser(string email)
    {
        var userInDb = await _context.Users.FirstOrDefaultAsync(user => user.email == email);
        if (userInDb != null)
        {
            return new UserDTO
            {
                id = userInDb.id,
                username = userInDb.username,
                email = userInDb.email,
                role = userInDb.role,
                createdAt = userInDb.createdAt
            };
        }
        return new UserDTO();
    }

    public async Task<List<UserDTO>> GetUsers(Guid? assigneeId, Status? status)
    {
        List<UserDTO> users = new List<UserDTO>();
        var userInDB = await _context.Users.ToListAsync();
        if (userInDB != null)
        {
            foreach (User user in userInDB)
            {
                var userdto = new UserDTO
                {
                    id = user.id,
                    username = user.username,
                    email = user.email,
                    role = user.role,
                    createdAt = user.createdAt
                };
                users.Add(userdto);
            }
        }
        return users;
    }

    public async Task<bool> ValidateUserCredentials(UserCredential userCredential)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.email == userCredential.email);
        if (user != null)
        {
            var passwordHash = _authService.CalculatePasswordHash(user, userCredential.password);
            var stringPasswordHash = BitConverter.ToString(passwordHash).Replace("-", "").ToLower();
            if (user.password == stringPasswordHash)
            {
                return true;
            }
        }
        return false;
    }

}