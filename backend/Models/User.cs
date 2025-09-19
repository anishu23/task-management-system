namespace TaskManagementSystem.Models;

public class User
{
    public Guid id { get; set; } = Guid.NewGuid();
    public string username { get; set; } = "";
    public string email { get; set; } = "";
    public string password { get; set; } = "";
    public string role { get; set; } = "";
    public DateTime createdAt { get; set; }
}