using TaskManagementSystem.Enums;
using TaskManagementSystem.Models;

namespace TaskManagementSystem.Interfaces;

public interface IUserService
{
    Task<UserDTO> CreateUser(User user);
    Task<UserDTO> GetUser(string email);
    Task<List<UserDTO>> GetUsers(Guid? assigneeId = null, Status? status = null);
    Task<bool> ValidateUserCredentials(UserCredential userCredential);
}