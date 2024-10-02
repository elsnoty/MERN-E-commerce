'use client'
import { useCookies } from 'react-cookie';
import OrderItem from '@/components/OrderPage/OrderItem';
import { Order } from '@/models/Products';
import { useFetchOrders } from '@/hooks/FetchAllProduct';
import style from '../categories/[id]/style.module.css'

const Orders = () => {
  const [cookies] = useCookies(['user_token']);
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null; // Get userId from localStorage

  const headers = cookies.user_token ? { Authorization: `Bearer ${cookies.user_token}` } : undefined;

  const { orders, error, isLoading } = useFetchOrders<Order[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/user/${userId}`,
    'userOrders',
    {
      headers,
      enabled: !!userId, 
    }
  );
  if (error) return <div>Error fetching orders</div>;
  if (isLoading) {
    return (
      <div className={`${style.LoaderContainer}`}>
        <span className={`${style.loader}`}></span>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders?.length === 0 ? (
        <p>No orders found for your account.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders?.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-lg">
              <div className="text-xl font-semibold mb-2 max-w-[290px] break-words">{order._id}</div>
              <p className="mb-2">Total: ${order.total}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.products.map((product, index) => (
                  <OrderItem key={`${product.productId}-${index}`} {...product}/>
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
