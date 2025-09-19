using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Enums;
using TaskManagementSystem.Interfaces;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly TaskManagementSystemContext _context;
    public AuthenticationService(TaskManagementSystemContext context)
    {
        _context = context;
    }
    public byte[] CalculatePasswordHash(User user, string password)
    {
        SHA256 sha256 = SHA256.Create();
        byte[] hashValue;
        UTF8Encoding objUtf8 = new UTF8Encoding();
        var saltedString = user.username + password + user.id;
        hashValue = sha256.ComputeHash(objUtf8.GetBytes(saltedString));
        return hashValue;
    }
}
