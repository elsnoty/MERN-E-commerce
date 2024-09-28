"use client"
import { UserError } from '@/models/error'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React, { SyntheticEvent, useState } from 'react'
import { useCookies } from 'react-cookie'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [token, setCookies] = useCookies(['user_token'])
    const { enqueueSnackbar } = useSnackbar();

    const handelForm = async(event: SyntheticEvent)=> {
        event.preventDefault()
        try {
            const result = await axios.post("http://localhost:3002/api/login", { username, password })
            setCookies('user_token', result.data.token) // the token in the loging server
            localStorage.setItem("userId", result.data.userID) // the user in the loging server to save userId
            enqueueSnackbar('Login Success', { variant: 'success' });
            router.push('/')
        } 
        catch (error) {
            if(error instanceof AxiosError){
                if(error?.response?.data.err === UserError.NO_USER_FOUND){
                    enqueueSnackbar('No User Found', { variant: 'error' })
                }else if(error?.response?.data.err === UserError.WRONG_CREDENTIALS){
                    enqueueSnackbar('Wrong Credentials', { variant: 'error' })
                }else {
                    enqueueSnackbar('Something went wrong', { variant: 'error' });
                }
            }else{
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }
        }
    }

    return (
        <div>
        <form onSubmit={handelForm} className='flex flex-col gap-y-4'>
            <label>UserName:</label>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className='border'
            />
            <label>Password:</label>
            <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='border'
            />
            <button type='submit' className='p-3 bg-green-500'>Login</button>
        </form>
        <p>Haven&apos;t Account yet?</p>
        <Link href={'/auth/register'} className='underline'>Register</Link>
        </div>
    )
}

export default LoginForm
