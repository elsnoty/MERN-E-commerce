'use client'
import React from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from cookies
    removeCookie('user_token');
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    // Redirect to the login page or home page
    router.push('/auth/login'); // Replace with your login page route
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
