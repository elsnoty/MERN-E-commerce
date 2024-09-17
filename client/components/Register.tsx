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
        <div>
        <form onSubmit={handelForm} className="flex flex-col gap-y-4">
            <label>UserName:</label>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username} 
                className="border" 
            />
            <label>Password:</label>
            <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className="border" 
            />
            <button type="submit" className="p-3 bg-green-500">Register</button>
        </form>
        <p>You have account?</p>
        <Link href={'/auth/login'} className='underline'>Login</Link>
        </div>
    );
};

export default RegisterForm;
