import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../context/UseAuthenticationHook';
import { useState, type FormEvent } from 'react';

const Login = () => {
  const { login } = useAuthentication();
  const navigate = useNavigate();

  const [email, setemail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (e) {
      setError('Invalid Username or Password!');
      console.log(e);
    }
  };

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-1/2 h-1/2 rounded-2xl border-1 flex flex-col items-center justify-center gap-8'>
          <div className='text-3xl font-bold'>LOGIN</div>
          <form className='w-full px-32' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='w-full border border-black rounded-lg'>
                <input
                  type='username'
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
                  placeholder='Email'
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
                Login
              </button>
            </div>
          </form>
          <div className='flex gap-2'>
            <span>New User?</span>
            <a className='text-blue-500 hover:text-blue-800' href='/register'>
              Sign Up Now
            </a>
          </div>
          {error && <div className='text-red-500'>{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Login;
