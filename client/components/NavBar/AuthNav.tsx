'use client'
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import React from 'react'
import LogoutButton from '../Logout';

const AuthNav = ({className, toggleMenu }: {className: string, toggleMenu?: () => void}) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={`${className}`}>
            {isAuthenticated ? (
          <>
            <Link href={'/orders'} onClick={toggleMenu}>Orders</Link>
            <div onClick={toggleMenu}>
              <LogoutButton />
            </div>
          </>
        ) : (
          <Link href={'/auth/login'} 
          className='px-3 py-1 bg-blue-500 font-semibold text-white rounded hover:bg-white-600 hover:text-black transition-colors duration-300'
          onClick={toggleMenu}
          >
            Login
            </Link> 
        )}
    </div>
  )
}

export default AuthNav
