'use client';
import React, { SyntheticEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useAuth } from '../hooks/useAuth';
import { UserError } from '@/models/error';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth(); 

  const handelForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!username.trim()) {
        enqueueSnackbar('Username is required', { variant: 'error' });
        return; // Exit the function early
    }
    if (!password.trim()) {
        enqueueSnackbar('Password is required', { variant: 'error' });
        return;
    }
    try {
      const result = await axios.post('http://localhost:3002/api/login', { username, password });
      login(result.data.token, result.data.userID);
      enqueueSnackbar('Login Success', { variant: 'success' });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.err === UserError.NO_USER_FOUND) {
          enqueueSnackbar('No User Found', { variant: 'error' });
        } else if (error?.response?.data?.err === UserError.WRONG_CREDENTIALS) {
          enqueueSnackbar('Wrong Credentials', { variant: 'error' });
        } else {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handelForm}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
          Login
        </button>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">Haven&apos;t Account yet?</p>
          <Link href="/auth/register" className="text-sm text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
