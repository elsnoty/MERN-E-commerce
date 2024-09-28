import express, { Request, Response } from 'express';
import Order, { IOrder } from '../models/Orders';

// Create a new order
const PostOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products, total } = req.body;
    console.log('Received order data:', { userId, products, total }); // Debugging line

    if (!userId) {
      return res.status(401).json({ error: 'User must be logged in to place an order' });
    }

    const newOrder: IOrder = new Order({
      userId,
      products,
      total,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error('Error while placing order:', err);
    return res.status(500).json({ error: 'Server error, could not place order' });
  }
};

const GetAllOrders = async (req: Request, res: Response) => {
  try {
      const orders = await Order.find({}).sort();
      res.status(200).json(orders);
  } catch (error) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(400).json({ error: 'An unknown error occurred' });
      }
  }
};

// Get all orders for a specific user
const GetOrder = async (req: Request, res: Response)=>{
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: 'Could not retrieve orders' });
  }
}

export {PostOrder, GetAllOrders, GetOrder};
