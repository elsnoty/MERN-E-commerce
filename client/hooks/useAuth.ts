'use client'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cookies.user_token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies]);

  const login = (token: string, userId: string) => {
    setCookie('user_token', token, { path: '/' });
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
    router.push('/');
  };

  const logout = () => {
    removeCookie('user_token', { path: '/' });
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  return {
    isAuthenticated,
    login,
    logout
  };
};
