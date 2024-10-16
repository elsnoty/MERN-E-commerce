'use client'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface StarRatingProps {
  maxStars?: number;
  rating?: number;
  editable?: boolean;
  onRatingSelect?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  rating = 0,
  editable = true,
  onRatingSelect,
}) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    if (editable && onRatingSelect) {
      onRatingSelect(value);
    }
  };

  return (
    <div className="star-rating flex gap-1 my-2">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size={'sm'}
            color={starValue <= (hover || rating) ? '#FFD700' : '#000'} 
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => editable && setHover(starValue)}
            onMouseLeave={() => editable && setHover(null)}
            style={{ cursor: editable ? 'pointer' : 'default', transition: 'color 200ms' }} 
          />
        );
      })}
    </div>
  );
};

export default StarRating;

