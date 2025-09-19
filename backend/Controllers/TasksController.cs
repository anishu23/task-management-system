using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Enums;
using TaskManagementSystem.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskManagementSystemContext _context;

        public TasksController(TaskManagementSystemContext context)
        {
            _context = context;
        }

        // GET: api/Tasks/5
        [HttpGet()]
        [Authorize]
        public async Task<ActionResult<List<TaskItem>>> GetTasks(Guid? assigneeId, Status? status)
        {
            List<TaskItem> taskItems = new List<TaskItem>();
            if (assigneeId != null && status != null)
            {
                var tasks = await _context.TaskItems.Where(task => task.assigneeId == assigneeId && task.status == status).ToListAsync<TaskItem>();
                if (taskItems == null || taskItems.Count < 1)
                {
                    taskItems = tasks;
                }
            }
            else if (status != null)
            {
                var tasks = await _context.TaskItems.Where(task => task.status == status).ToListAsync<TaskItem>();
                if (taskItems == null || taskItems.Count < 1)
                {
                    taskItems = tasks;
                }
            }
            else if (assigneeId != null)
            {
                var tasks = await _context.TaskItems.Where(task => task.assigneeId == assigneeId).ToListAsync<TaskItem>();
                if (taskItems == null || taskItems.Count < 1)
                {
                    taskItems = tasks;
                }
            }
            else
            {
                var tasks = await _context.TaskItems.ToListAsync();
                if (taskItems == null || taskItems.Count < 1)
                {
                    taskItems = tasks;
                }

            }
            return taskItems;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutTaskItem(Guid id, TaskItem taskItem)
        {
            if (id != taskItem.id)
            {
                return BadRequest();
            }

            _context.Entry(taskItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItem taskItem)
        {
            taskItem.id = Guid.NewGuid();
            _context.TaskItems.Add(taskItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks), new { id = taskItem.id }, taskItem);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTaskItem(Guid id)
        {
            var taskItem = await _context.TaskItems.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }

            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskItemExists(Guid id)
        {
            return _context.TaskItems.Any(e => e.id == id);
        }
    }
}
