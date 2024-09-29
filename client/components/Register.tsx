"use client";
import axios, { AxiosError } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import Link from 'next/link';
import { UserError } from '@/models/error';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handelForm = async(event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3002/api/register", { username, password });
            enqueueSnackbar('Register Successfully, Now login', { variant: 'success' });
            router.push('/auth/login');
        } catch (error) {
            // Cast the error to AxiosError to get proper typing
            if (error instanceof AxiosError) {
                if (error.response?.data?.err === UserError.USERNAME_ALREADY_EXISTS) {
                    enqueueSnackbar('Username already exists', { variant: 'error' });
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
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
            <p className="text-sm text-gray-500">You have account?</p>
            <Link href="/auth/login" className="text-sm text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    );
};

export default RegisterForm;
