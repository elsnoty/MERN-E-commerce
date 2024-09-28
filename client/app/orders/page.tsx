'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { StaticImageData } from 'next/image';
import OrderItem from '@/components/OrderPage/OrderItem';

interface Product {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: StaticImageData;
}

interface Order {
  _id: string;
  userId: string;
  products: Product[];
  total: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cookies] = useCookies(['user_token']);
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null; // Get userId from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders filtered by userId
        const response = await axios.get(`http://localhost:3002/api/orders/user/${userId}`, {
          headers: { Authorization: `Bearer ${cookies.user_token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (userId) fetchOrders(); // Only fetch if userId is found
  }, [cookies.user_token, userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found for your account.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="mb-2">Total: ${order.total}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.products.map((product) => (
                  <OrderItem key={product.productId} {...product}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
