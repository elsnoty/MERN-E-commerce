"use client";
import { useCookies } from 'react-cookie';
import axios, { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import React, { SyntheticEvent, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';


const Review = ({ productId }: {productId?: string}) => {
  const { isAuthenticated, userId } = useAuth();
  const [rating, setRating] = useState<number | ''>('');
  const [comment, setComment] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const [cookies] = useCookies(['user_token']);

  const handleForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (rating === '' || rating < 1 || rating > 5) {
      enqueueSnackbar('Rating must be between 1 and 5', { variant: 'error' });
      return;
    }
    if (!comment.trim()) {
      enqueueSnackbar('Comment is required', { variant: 'error' });
      return;
    }

    if (!isAuthenticated || !userId) {
      enqueueSnackbar('You must be logged in to submit a review', { variant: 'error' });
      return;
    }

    try {
      await axios.post(
        'http://localhost:3002/api/reviews',
        {
          productId,
          rating,
          comment,
          user: userId,
        },
        {
          headers: {
            'Authorization': `Bearer ${cookies.user_token}`,
          },
        }
      );

      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      setRating('');
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
        className="w-full max-w-md bg-gray-200 py-8 px-5 rounded-lg shadow-md flex flex-col gap-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a Review</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            className="w-full p-1 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
          Submit Review
        </button>
      </form>
  );
};

export default Review;
