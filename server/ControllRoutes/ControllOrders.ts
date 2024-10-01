import express, { Request, Response } from 'express';
import Order, { IOrder } from '../models/Orders';

// Create a new order
const PostOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products, total } = req.body;

    if (!userId) {
      return res.status(401);
    }

    const newOrder: IOrder = new Order({
      userId,
      products,
      total,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    return res.status(500);
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
          res.status(400);
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
    return res.status(500);
  }
}

export {PostOrder, GetAllOrders, GetOrder};
