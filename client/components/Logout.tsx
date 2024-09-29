'use client'
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth(); // Use the logout function from the hook

  return (
    <button
      onClick={logout}
      className='px-3 py-1 bg-red-500 text-white rounded font-semibold hover:bg-gray-600 transition-colors duration-300'
    >
      Logout
    </button>
  );
};

export default LogoutButton;
