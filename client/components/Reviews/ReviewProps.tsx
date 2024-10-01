  import React from 'react';
  import { ReviewProp } from '@/models/Products';

  const ReviewProps = ({ item }: { item: ReviewProp }) => {
    return (
      <div className='border border-gray-200 p-4 mb-4 rounded-lg shadow-sm text-start text-zinc-950 ml-2'>
        {/* Header Section */}
          <div className='font-bold'>
            User: {item.username}
          </div>
          <div className=''>
              <p className='text-xsmy-2'>({item.rating} / 5)</p>
          </div>
        <p className=' text-sm max-w-[260px] overflow-wrap break-words '>
          {item.comment}
        </p>
      </div>
    );
  };

  export default ReviewProps;
