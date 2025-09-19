
using TaskManagementSystem.Enums;

namespace TaskManagementSystem.Models;

public class TaskItem
{
    public Guid id { get; set; } = Guid.NewGuid();
    public string title { get; set; } = "";
    public string description { get; set; } = "";
    public Status status { get; set; }
    public Priority priority { get; set; }
    public Guid assigneeId { get; set; } = Guid.NewGuid();
    public Guid creatorId { get; set; } = Guid.NewGuid();
    public DateTime createdAt { get; set; }
    public DateTime updatedAt { get; set; }
}