'use client';
import React from 'react';
import { clearCart } from '@/store/CartSlice';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import { useCart } from '@/hooks/UseCart';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [cookies] = useCookies(['user_token']);

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!cookies.user_token) {
      enqueueSnackbar('Please login to proceed to checkout', { variant: 'error' });
      router.push('/auth/login');
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      enqueueSnackbar('User ID not found. Please log in again.', { variant: 'error' });
      return;
    }

    const formattedProducts = cartItems.map(item => ({
      productId: item.id,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const response = await axios.post('http://localhost:3002/api/orders', {
        userId: userId,
        products: formattedProducts,
        total: totalPrice,
      }, {
        headers: { Authorization: `Bearer ${cookies.user_token}` },
      });

      if (response.data) {
        enqueueSnackbar('Order placed successfully', { variant: 'success' });
        dispatch(clearCart());
        router.push('/orders');
      } else {
        enqueueSnackbar('Order was not created. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Failed to place order', { variant: 'error' });
    }
  };

  return (
    <div className='container mx-auto my-8 p-4'>
      <h3 className='font-bold text-3xl mb-4'>Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <div className='text-center'>
          <p className='text-xl'>Your cart is empty.</p>
          <Link href='/categories'>
            <span className='text-primary underline mt-4 inline-block'>Continue Shopping</span>
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <OrderSummary totalPrice={totalPrice} onCheckout={handleCheckout} />
        </div>
      )}
    </div>
  );
};

export default Cart;
