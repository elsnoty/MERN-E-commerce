import mongoose from 'mongoose';
import ReviewModel from '../models/Reviews';
import { Request, Response } from 'express';
import ProductModel from '../models/ProductsSchema';
import UserModel from '../models/User';

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
      // Ensure productId is cast to ObjectId
      const productObjectId = new mongoose.Types.ObjectId(productId);
  
      // Find the user by their ID
      const userDocument = await UserModel.findById(user);
  
      // Check if the user exists
      if (!userDocument) {
        return res.status(404);
      }
  
      // Create the review with `username` included
      const review = await ReviewModel.create({
        productId: productObjectId,
        rating,
        comment,
        user: userDocument._id, // Store the user ID reference
        username: userDocument.username, // Store the username for display
      });
  
      // Find the product and push the review ID into its `reviews` array
      const product = await ProductModel.findById(productObjectId);
      if (!product) {
        return res.status(404);
      }
  
      product.reviews.push(review._id as mongoose.Schema.Types.ObjectId);
      await product.save();
  
      res.status(200).json(review);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400);
      } else {
        res.status(400);
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
