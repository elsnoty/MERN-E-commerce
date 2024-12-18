import React from 'react';
import { ReviewProp } from '@/models/Products';
import StarRating from '@/hooks/CustomStar';

const ReviewProps = ({ item }: { item: ReviewProp }) => {
  return (
    <div className='border border-gray-200 p-4 mb-4 rounded-lg shadow-sm text-start text-zinc-950 ml-2'>
      {/* Header Section */}
      <div className='font-bold'>
        <span className='font-bold'>User:</span> {item.username}
      </div>
      <div className='flex items-center'>
        <span className='font-bold'>Rate:</span>
          <StarRating editable={false} rating={item.rating}/>
      </div>
      <p className='text-sm max-w-[260px] overflow-wrap break-words'>
        <span className='font-bold'>Comment:</span> {item.comment}
      </p>
    </div>
  );
};

export default ReviewProps;
