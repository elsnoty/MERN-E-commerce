import Accordion from '@/components/ui/RT';
import React from 'react';

const ReviewAndDiscription = ({ discription }: { discription: string }) => {
  return (
    <div className='mt-4'>
      <p className='pb-3'>
        Shipping 
        <span className='block font-bold'>You&apos;ll see our shipping options at checkout. </span>
      </p>
      <Accordion title="Shipping & Returns">
            Free standard shipping on orders $20+ and free 60-day returns.
            </Accordion>
        <Accordion title="Description">
            <p>{discription}</p>
        </Accordion>
    </div>
  );
}

export default ReviewAndDiscription;
