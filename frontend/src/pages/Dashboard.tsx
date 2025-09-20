import { useCallback, useEffect, useState } from 'react';
import { useAuthentication } from '../context/UseAuthenticationHook';
import { TaskStatus, type Task } from '../types/task';
import TaskCard from '../components/TaskCard';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';
import NewTaskModal from '../components/NewTaskModal';

const StatusLabels = ['TO_DO', 'IN_PROGRESS', 'DONE'];

const initialTasks: Task[] = [];

const initialUsers: User[] = [];

const Dashboard = () => {
  const { user, logout, jwt, userId } = useAuthentication();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isShowNewTaskModal, toggleNewTaskModal] = useState<boolean>(false);
  const [isShowMyTasks, toggleMyTasks] = useState<boolean>(true);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const navigate = useNavigate();

  useEffect(() => {
    let taskUrl = 'https://localhost:7117/api/Tasks';
    if (isShowMyTasks && userId) taskUrl = taskUrl + '?assigneeId=' + userId;
    fetch(taskUrl, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    })
      .then(async (res) => {
        if (res.status == 401) {
          handleLogout();
          navigate('/login');
        }
        const tasks = await res.json();
        setTasks([...tasks]);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('https://localhost:7117/api/User', {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    })
      .then(async (res) => {
        if (res.status == 401) {
          handleLogout();
          navigate('/login');
        }
        const users = await res.json();
        setUsers([...users]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [handleLogout, jwt, navigate, isShowMyTasks, userId]);

  const tasksByStatus = (status: int) =>
    tasks.filter((task) => task.status === TaskStatus[status]);

  const handleStatusChange = (taskId: string, value: string) => {
    const tIndex = tasks.findIndex((task) => task.id == taskId);
    const newStatus =
      TaskStatus[value.replace(' ', '_') as keyof typeof TaskStatus];
    if (tIndex > -1) {
      tasks[tIndex].status = newStatus;
    }
    setTasks([...tasks]);
    putTask(tasks[tIndex]);
  };

  const putTask = (task: Task) => {
    fetch(`https://localhost:7117/api/Tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
      body: JSON.stringify(task),
    })
      .then(async (res) => {
        if (res.status === 401) {
          handleLogout();
          navigate('/login');
        } else if (!res.ok) {
          console.error('Failed to update task status');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAssigneeChange = (taskId: string, assigneeId: string) => {
    const tIndex = tasks.findIndex((task) => task.id == taskId);
    const newAssignee = users.find((u) => u.id == assigneeId);
    if (tIndex > -1) {
      tasks[tIndex].assigneeId = newAssignee?.id;
    }
    setTasks([...tasks]);
    putTask(tasks[tIndex]);
  };

  const handleAddNewTask = (task: Task) => {
    task.creatorId = userId;
    fetch('https://localhost:7117/api/Tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
      body: JSON.stringify(task),
    })
      .then(async (res) => {
        if (res.status === 201 || res.status === 200) {
          const newTask = await res.json();
          setTasks([...tasks, newTask]);
          toggleNewTaskModal(false);
        } else if (res.status === 401) {
          handleLogout();
          navigate('/login');
        } else {
          console.error('Failed to add task');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className='relative h-full w-full flex flex-col'>
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
        <div className='w-full px-8 py-4 gap-5 flex flex-col'>
          <div className='w-full flex justify-between px-4'>
            <div className='flex gap-2'>
              {isShowMyTasks ? (
                <button
                  className='flex bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded-4xl justify-center gap-1 items-center shadow-sm'
                  onClick={() => toggleMyTasks(!isShowMyTasks)}
                >
                  <span>Show All</span>
                </button>
              ) : (
                <button
                  className='flex bg-indigo-200 hover:bg-indigo-300 text-gray-600 py-2 px-4 rounded-4xl justify-center gap-1 items-center shadow-sm'
                  onClick={() => toggleMyTasks(!isShowMyTasks)}
                >
                  <span>Show Assigned</span>
                </button>
              )}
            </div>

            <button
              className='flex bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded-4xl justify-center gap-1 items-center shadow-sm'
              onClick={() => toggleNewTaskModal(!isShowNewTaskModal)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='18'
                height='18'
                viewBox='0 0 50 50'
                fill='text-gray-600'
              >
                <path d='M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z'></path>
              </svg>
              <span>Add New Task</span>
            </button>
          </div>
          <div className='flex w-full gap-4'>
            {StatusLabels.map((status) => (
              <div
                key={status}
                className='w-1/3 border-gray-100 border flex flex-col rounded-xl shadow-sm'
              >
                <div className='text-center py-4 text-xl bg-indigo-100 rounded-t-xl'>
                  {status.replace('_', ' ')}
                </div>
                <div className='py-4 px-2'>
                  {tasksByStatus(status).map((task: Task) => (
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      status={task.status}
                      description={task.description}
                      createdAt={task.createdAt}
                      updatedAt={task.updatedAt}
                      statusLabels={StatusLabels}
                      handleStatusChange={handleStatusChange}
                      handleAssigneeChange={handleAssigneeChange}
                      users={users}
                      assigneeId={task.assigneeId}
                      key={task.id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isShowNewTaskModal && (
        <NewTaskModal
          id={''}
          title={''}
          status={1}
          description={''}
          createdAt={new Date()}
          updatedAt={new Date()}
          statusLabels={StatusLabels}
          users={users}
          onAddTask={handleAddNewTask}
          onCancel={() => toggleNewTaskModal(!isShowNewTaskModal)}
        />
      )}
    </>
  );
};

export default Dashboard;
