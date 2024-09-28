'use client'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartFromLocalStorage } from '@/store/CartSlice';
import { RootState } from '@/store/store';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  return cart;
};
