import mongoose, { Schema, Document } from 'mongoose';

interface IProduct {
  productId: string;
  quantity: number;
  price: number;
  image: string;
  size:string;
}

interface IOrder extends Document {
  userId: string;
  products: IProduct[];
  total: number;
}

// Create the schema for the order
const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      image: {type: String, required: true},
      size: {type: String,}
    },
  ],
  total: { type: Number, required: true },
});

// Export the Order model with IOrder interface
const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
export { IOrder, IProduct };
