import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';

const ReviewAndDiscription = ({ discription }: { discription: string }) => {
  return (
    <div className='mt-4'>
      <p className='pb-3'>
        Shipping 
        <span className='block font-bold'>You&apos;ll see our shipping options at checkout. </span>
      </p>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1"  className='border-b-2'>
          <AccordionTrigger className='underline font-semibold text-lg pb-2'>
            Shipping & Returns
          </AccordionTrigger>
          <AccordionContent className='max-w-[350px] font-Poppins '>
            Free standard shipping on orders $20+ and free 60-day returns.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2"  className='py-4 border-b-2'>
          <AccordionTrigger className='underline font-semibold text-lg'>
            Description
          </AccordionTrigger>
          <AccordionContent className='max-w-[350px]'>
            <p>{discription}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ReviewAndDiscription;
