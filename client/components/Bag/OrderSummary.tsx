import React from 'react';

interface OrderSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
}

const OrderSummary= ({ totalPrice, onCheckout }: OrderSummaryProps) => {
  return (
    <div className='border-t mt-6 pt-4'>
      <h3 className='font-bold text-xl'>Order Summary</h3>
      <div className='flex justify-between items-center text-lg font-medium mt-2'>
        <span>Total Price</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button className='w-full bg-primary text-white py-2 rounded-lg mt-4' onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
