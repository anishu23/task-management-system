import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../context/UseAuthenticationHook';
import { useState, type FormEvent } from 'react';
import type { User } from '../types';

const Register = () => {
  const { register } = useAuthentication();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const newUser: User = {
        email: email,
        username: username,
        role: role,
        id: undefined,
        createdAt: undefined,
      };
      await register(newUser, password);
      navigate('/login');
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };
  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-1/2 h-2/3 rounded-2xl border-1 flex flex-col items-center justify-center gap-8'>
          <div className='text-3xl font-bold'>REGISTER NEW USER</div>
          <form className='w-full px-32' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='w-full border border-black rounded-lg'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
                  placeholder='Email'
                />
              </div>
              <div className='w-full border border-black rounded-lg'>
                <input
                  type='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
                  placeholder='Username'
                />
              </div>
              <div className='w-full border border-black rounded-lg'>
                <input
                  type='role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
                  placeholder='Role'
                />
              </div>

              <div className='w-full border border-black rounded-lg'>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
                  placeholder='Password'
                />
              </div>

              <button
                type='submit'
                className='bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg'
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className='flex gap-2'>
            <span>Exisiting User?</span>
            <a className='text-blue-500 hover:text-blue-800' href='/login'>
              Sign In Here
            </a>
          </div>
          {error && <div className='text-red-500'>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Register;
