import { TaskStatus } from '../types/task';
import type { User } from '../types';
import { useState } from 'react';

export type TaskCardProps = {
  id: string;
  title: string;
  status: TaskStatus;
  assigneeId?: string;
  creatorId?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  statusLabels: string[];
  users: User[];
  handleStatusChange: (taskId: string, value: string) => void;
  handleAssigneeChange: (taskId: string, assigneeId: string) => void;
};

const TaskCard = ({ ...task }: TaskCardProps) => {
  const currentAssignee = task.users.find(
    (u) => u.id == task.assigneeId
  )?.username;

  const handleUserChange = (e, task: TaskCardProps) => {
    const assignee = task.users.find((u) => u.username === e.target.value);
    if (assignee && assignee.id) {
      task.handleAssigneeChange(task.id, assignee.id);
    }
  };

  return (
    <div className='border border-gray-200 shadow-sm rounded-sm'>
      <div
        className='p-2 border-b-1 border-gray-300 flex justify-between items-center'
        key={task.id}
      >
        <div>{task.title}</div>
        <div className='flex gap-2 items-center'>
          <label>Move to:</label>
          <select
            className='appearance-none bg-indigo-100 border border-indigo-200 text-gray-700 p-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-state'
            onChange={(e) => task.handleStatusChange(task.id, e.target.value)}
            value={'Select Status'}
          >
            <option>Select Status</option>
            {task.statusLabels
              .filter((s) => s != TaskStatus[task.status].replace('-', ' '))
              .map((s, i) => (
                <option key={i}>{s.replace('_', ' ')}</option>
              ))}
          </select>
        </div>
      </div>
      <div className='p-3'>{task.description}</div>
      <div className='p-3 flex gap-2 items-center'>
        <label>Assignee:</label>
        <select
          className='appearance-none bg-indigo-100 border border-indigo-200 text-gray-700 p-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          id='grid-state'
          value={currentAssignee}
          onChange={(e) => handleUserChange(e, task)}
        >
          {task.users.map((u) => (
            <option key={u.id}>{u.username}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
