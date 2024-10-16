'use client'
import React, { SyntheticEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useAuth } from '@/hooks/useAuth';
import StarRating from '@/hooks/CustomStar';

const Review = ({ productId }: { productId?: string }) => {
  const { isAuthenticated, userId } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const [cookies] = useCookies(['user_token']);

  const handleForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (rating < 1 || rating > 5) {
      enqueueSnackbar('Please Add Rating', { variant: 'error', autoHideDuration: 1500 });
      return;
    }
    if (!comment.trim()) {
      enqueueSnackbar('Comment is required', { variant: 'error', autoHideDuration: 1500 });
      return;
    }

    if (!isAuthenticated || !userId) {
      enqueueSnackbar('You must be logged in to submit a review', { variant: 'error', autoHideDuration: 1500 });
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews`,
        {
          productId,
          rating,
          comment,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );

      enqueueSnackbar('Review submitted successfully', { variant: 'success', autoHideDuration: 1500,  });
      setRating(0);
      setComment('');
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error || 'Something went wrong. Please try again.';
        enqueueSnackbar(message, { variant: 'error' });
      } else {
        enqueueSnackbar('An unknown error occurred.', { variant: 'error' });
      }
    }
  };

  return (
    <form
      onSubmit={handleForm}
      className='w-full max-w-md bg-gray-200 py-8 px-5 rounded-lg shadow-md flex flex-col gap-y-6 my-3'
    >
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Add a Review</h2>
      <div className='starRating'>
        <label className='block text-xl font-medium text-gray-700'>Rating</label>
          <StarRating onRatingSelect={(stars)=> setRating(stars)} rating={rating}/>
      </div>
      <div>
        <label htmlFor='comment' className='block text-sm font-medium text-gray-700'>
          Comment
        </label>
        <textarea
          id='comment'
          name='comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='w-full p-3 border rounded focus:outline-none focus:border-blue-500 resize-none'
        />
      </div>
      <button
        type='submit'
        className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300'
      >
        Submit Review
      </button>
    </form>
  );
};

export default Review;
