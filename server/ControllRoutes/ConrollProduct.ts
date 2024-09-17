import mongoose from 'mongoose';
import ProductModel from '../models/ProductsSchema';
import { Request, Response } from 'express';

// Get all products
const GetAllProducts = async (req: Request, res: Response) => {
    //The 10 is the radix parameter for parseInt, specifying that the string should be interpreted as a base-10 number (decimal).
    const page = req.query.p ? parseInt(req.query.p as string, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

    try {
      // If page and limit are defined, use pagination, else return all products
      let products;
      if (page !== undefined && limit !== undefined) {
        products = await ProductModel.find({})
          .sort()
          .skip(page * limit)
          .limit(limit);
      } else {
        // Fetch all products without pagination
        products = await ProductModel.find({}).sort();
      }
  
      res.status(200).json(products);
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
    const { name, categories, price, description, stock, image, size } = req.body;

    try {
        const product = await ProductModel.create({ name, categories, price, description, stock, image, size });
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
