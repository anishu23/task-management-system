using TaskManagementSystem.Enums;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Interfaces;

public interface IJwtTokenService
{
    string GenerateJwtToken(string username);
}