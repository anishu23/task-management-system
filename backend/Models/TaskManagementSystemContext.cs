using Microsoft.EntityFrameworkCore;

namespace TaskManagementSystem.Models;

public class TaskManagementSystemContext : DbContext
{
    public TaskManagementSystemContext(DbContextOptions<TaskManagementSystemContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem> TaskItems { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
}