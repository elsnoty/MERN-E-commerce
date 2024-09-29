import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { updateQuantity, removeFromCart } from '@/store/CartSlice';
import { useSnackbar } from 'notistack';
import { CartItemProps } from '@/models/Products';



const CartItem = ({ id, name, price, quantity, image, size }: CartItemProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleQuantityChange = (delta: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + delta }));
  };

  const handleDelete = () => {
    dispatch(removeFromCart(id));
    enqueueSnackbar('Product Deleted', { variant: 'success' });
  };

  return (
    <div className='flex justify-between items-center border-b py-4'>
      <Link href={`/categories/${id}`} className='flex items-center'>
        <Image src={image} alt={name} className='w-20 h-20 object-cover rounded' width={80} height={80} />
        <div className='ml-6'>
          <h4 className='font-medium text-lg'>{name}</h4>
          <p className='text-sm text-gray-500'>${price.toFixed(2)}</p>
          <p>Size: {size}</p>
        </div>
      </Link>
      <div className='flex items-center'>
        <button className='px-3 py-1 bg-gray-200 rounded-l-lg' onClick={() => handleQuantityChange(-1)}>-</button>
        <span className='px-4 py-1 bg-gray-100 border text-sm'>{quantity}</span>
        <button className='px-3 py-1 bg-gray-200 rounded-r-lg' onClick={() => handleQuantityChange(1)}>+</button>
      </div>
      <button onClick={handleDelete} className='text-red-500 hover:bg-red-100 p-2 rounded-full ml-4'>
        <FontAwesomeIcon icon={faTrashCan} size='lg' />
      </button>
    </div>
  );
};

export default CartItem;
