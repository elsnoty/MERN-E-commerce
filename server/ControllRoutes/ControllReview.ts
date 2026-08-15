import mongoose from 'mongoose';
import ReviewModel from '../models/Reviews';
import { Request, Response } from 'express';
import ProductModel from '../models/ProductsSchema';
import UserModel from '../models/User';
import Order from '../models/Orders';

// Get All Reviews
const GetAllReviews = async (req: Request, res: Response) => {
  try {
    // Include the `username` field in the result
    const reviews = await ReviewModel.find().select('productId rating comment username');
    res.status(200).json(reviews);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400);
    } else {
      res.status(400);
    }
  }
};

// Post a Review
const PostReview = async (req: Request, res: Response) => {
    const { productId, rating, comment, user } = req.body;
  
    try {
      if (!productId || !user) {
        return res.status(400).json({ error: 'Product and user are required.' });
      }

      if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ error: 'Invalid product or user id.' });
      }

      const productObjectId = new mongoose.Types.ObjectId(productId);
      const userObjectId = new mongoose.Types.ObjectId(user);

      const product = await ProductModel.findById(productObjectId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      // Find the user by their ID
      const userDocument = await UserModel.findById(userObjectId);
  
      // Check if the user exists
      if (!userDocument) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const hasPurchasedProduct = await Order.exists({
        userId: user,
        'products.productId': productId,
      });

      if (!hasPurchasedProduct) {
        return res.status(403).json({ error: 'You can only review products you purchased.' });
      }

      const existingReview = await ReviewModel.findOne({
        productId: productObjectId,
        user: userObjectId,
      });

      if (existingReview) {
        return res.status(409).json({ error: 'You already reviewed this product.' });
      }
  
      // Create the review with `username` included
      const review = await ReviewModel.create({
        productId: productObjectId,
        rating,
        comment,
        user: userObjectId, // Store the user ID reference
        username: userDocument.username, // Store the username for display
      });
  
      await ProductModel.findByIdAndUpdate(productObjectId, {
        $addToSet: { reviews: review._id },
      });
  
      res.status(200).json(review);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 11000
      ) {
        return res.status(409).json({ error: 'You already reviewed this product.' });
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(400).json({ error: 'Unable to submit review.' });
      }
    }
  };

// Get Reviews by Product
const GetReviewsByProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        // Ensure productId is a valid ObjectId
        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Retrieve reviews for the given product and populate the user details
        const reviews = await ReviewModel.find({ productId: productObjectId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        if (reviews.length === 0) {
            return res.status(404);
        }
        res.status(200).json(reviews);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400);
        } else {
            res.status(400);
        }
    }
};

export { GetAllReviews, PostReview, GetReviewsByProduct };
