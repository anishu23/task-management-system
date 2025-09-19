import { useState } from 'react';
import { useAuthentication } from '../context/UseAuthenticationHook';
import { TaskStatus, type Task } from '../types/task';

const StatusLabels = ['TO_DO', 'IN_PROGRESS', 'DONE'];

const initialTasks: Task[] = [
  {
    id: '685a1a42-4ea2-48dc-85b4-4a5cd26ea4f9',
    title: 'Task One',
    description: 'This is new Task 1',
    status: 1,
    assigneeId: 'da1352a7-2562-4ea8-8116-fe8b70ed0ff2',
    creatorId: 'ccbd66e6-7274-441c-9294-a021a6bb9c14',
    createdAt: new Date('2025-09-19T05:44:23.646Z'),
    updatedAt: new Date('2025-09-19T05:44:23.646Z'),
  },
  {
    id: '685a1a42-4ea2-48dc-85b4-4a5cd26ea4f9',
    title: 'Task Two',
    description: 'This is new Task 2',
    status: 2,

    assigneeId: 'da1352a7-2562-4ea8-8116-fe8b70ed0ff2',
    creatorId: 'ccbd66e6-7274-441c-9294-a021a6bb9c14',
    createdAt: new Date('2025-09-19T05:44:23.646Z'),
    updatedAt: new Date('2025-09-19T05:44:23.646Z'),
  },
  {
    id: '685a1a42-4ea2-48dc-85b4-4a5cd26ea4f9',
    title: 'Task Three',
    description: 'This is new Task 3',
    status: 3,

    assigneeId: 'da1352a7-2562-4ea8-8116-fe8b70ed0ff2',
    creatorId: 'ccbd66e6-7274-441c-9294-a021a6bb9c14',
    createdAt: new Date('2025-09-19T05:44:23.646Z'),
    updatedAt: new Date('2025-09-19T05:44:23.646Z'),
  },
];

const Dashboard = () => {
  const { user, logout } = useAuthentication();

  const handleLogout = () => {
    logout();
  };

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const tasksByStatus = (status: int) =>
    tasks.filter((task) => task.status === TaskStatus[status]);

  const handleStatusChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className='h-full w-full flex flex-col'>
        <div className='w-full flex justify-between border-b-1 border-gray-200 px-8 py-4 shadow-md'>
          <h1 className='w-1/2 text-3xl font-bold'>Task Management System</h1>
          <ul className='w-1/2 flex justify-end items-center'>
            <li className='mr-6'>
              <span className='text-gray-800'>Welcome {user}</span>
            </li>
            <li className='mr-6'>
              <a
                className='text-blue-500 hover:text-blue-800'
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
        <div className='w-full px-8 py-4 gap-5 flex'>
          {StatusLabels.map((status) => (
            <div className='w-1/3 border-gray-100 border flex flex-col rounded-xl shadow-sm'>
              <div className='text-center py-4 text-xl bg-indigo-100 rounded-t-xl'>
                {status.replace('_', ' ')}
              </div>
              <div className='py-4 px-2'>
                {tasksByStatus(status).map((task: Task) => (
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
                          onChange={handleStatusChange}
                        >
                          {StatusLabels.filter((s) => s != status).map((s) => (
                            <option>{s.replace('_', ' ')}</option>
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
                      >
                        {StatusLabels.map((s) => (
                          <option>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
