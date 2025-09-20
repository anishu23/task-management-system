import { useState } from 'react';
import type { User } from '../types';
import { TaskStatus, type Task } from '../types/task';

export type NewTaskModalProps = {
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
  onAddTask: (task: Task) => void;
  onCancel: () => void;
};

const NewTaskModal = ({ ...task }: NewTaskModalProps) => {
  const [status, setStatus] = useState<string>();
  const [assignee, setAssignee] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleAddNewTask = (task: NewTaskModalProps) => {
    if (
      status &&
      status != '0' &&
      assignee != '0' &&
      title &&
      title.trim() !== '' &&
      description &&
      description.trim() !== ''
    ) {
      const newTask: Task = {
        title: title,
        status: TaskStatus[status],
        description: description,
        createdAt: new Date(),
        updatedAt: new Date(),
        assigneeId: assignee,
        priority: 1,
      };
      task.onAddTask(newTask);
    }
  };
  return (
    <div className='absolute w-full h-full bg-gray-400/50 top-0 left-0 flex justify-center items-center'>
      <div className='border border-gray-200 shadow-sm rounded-sm bg-white w-1/3 '>
        <div className='text-xl p-3 border-b-1'>Add New Task</div>
        <div className='px-2 py-4 border-b-1 border-gray-300 flex flex-col justify-between items-center'>
          <div className='mb-4 w-full'>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description'
              type='text'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className='mb-4 w-full'>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description'
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='mb-4 flex flex-col gap-2 w-full'>
            <label>Status</label>
            <select
              className='appearance-none bg-indigo-100 border border-indigo-200 text-gray-700 p-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-state'
              onChange={(e) => {
                console.log('Status = ', e.target.value);
                setStatus(e.target.value);
              }}
              value={status}
            >
              <option value='0'>Select Status</option>
              {task.statusLabels.map((s, i) => (
                <option key={i} value={s}>
                  {s.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label>Assignee</label>
            <select
              className='appearance-none bg-indigo-100 border border-indigo-200 text-gray-700 p-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-state'
              onChange={(e) => {
                console.log('Assignee = ', e.target.value);
                setAssignee(e.target.value);
              }}
              value={assignee}
            >
              <option value={'0'}>Select Assignee</option>
              {task.users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex justify-end p-3 gap-4'>
          <button
            onClick={task.onCancel}
            className='min-w-22 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddNewTask(task)}
            className='min-w-22 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
