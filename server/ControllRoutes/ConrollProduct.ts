import mongoose from 'mongoose';
import ProductModel from '../models/ProductsSchema';
import { Request, Response } from 'express';

// Get all products
const GetAllProducts = async (req: Request, res: Response) => {
    const page = req.query.p ? parseInt(req.query.p as string, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

    try {
        let products;
        let totalCount: number;

        if (page !== undefined && limit !== undefined) {
            totalCount = await ProductModel.countDocuments({});
            products = await ProductModel.find({})
                .sort()
                .skip(page * limit)
                .limit(limit);
        } else {
            totalCount = await ProductModel.countDocuments({});
            products = await ProductModel.find({}).sort();
        }

        res.status(200).json({ products, totalCount });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};


// Get a Single Product

// Post a product
const PostProduct = async (req: Request, res: Response) => {
    const { name, categories, price, description, stock, image, size, rate } = req.body;

    try {
        const product = await ProductModel.create({ name, categories, price, description, stock, image, size, rate });
        res.status(200).json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};



// Update Product
const UpdateProduct = async (req: Request, res: Response) => {
    const { id } = req.params; // Get product ID from route params
    const updateData = req.body; // Get update data from request body

    try {
        // Find and update product by ID
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure the data is valid according to the schema
        });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

// Single Product
const SingleProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
      
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  };
  
export { GetAllProducts, PostProduct, UpdateProduct, SingleProduct };
