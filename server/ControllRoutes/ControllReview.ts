import mongoose from 'mongoose';
import ReviewModel from '../models/Reviews';
import { Request, Response } from 'express';
import ProductModel from '../models/ProductsSchema';

//Get all Reviews 
const GetAllReviews = async (req: Request, res: Response) => {
    try {
        const review = await ReviewModel.find({}).sort();
        res.status(200).json(review);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};


//  Post a Review 
const PostReview = async (req: Request, res: Response) => {
    const { productId, rating, comment, user } = req.body;

    try {
        // Ensure productId is cast to ObjectId
        const productObjectId = new mongoose.Types.ObjectId(productId);

        const review = await ReviewModel.create({ productId: productObjectId, rating, comment, user });

        const product = await ProductModel.findById(productObjectId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.reviews.push(review._id as mongoose.Schema.Types.ObjectId);
        await product.save();
        res.status(200).json(review);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export {GetAllReviews, PostReview};