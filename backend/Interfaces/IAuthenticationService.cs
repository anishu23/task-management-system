using TaskManagementSystem.Enums;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Interfaces;

public interface IAuthenticationService
{
    byte[] CalculatePasswordHash(User user, string password);
}