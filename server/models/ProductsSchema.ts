import mongoose, { Document } from 'mongoose';

interface Product extends Document {
    name: string;
    categories: string[];
    price: number;
    description: string;
    stock: number;
    image: string[];
    size?: string[];
    rate: number;
    reviews: mongoose.Schema.Types.ObjectId[]; 
}

// Define the schema for the product
const Schema = mongoose.Schema;

const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    price: {    
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: [String],
        required: true, 
    },
    size: {
        type: [String],
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
      }],
      rate:{
        type: Number,
        required:true
      }
}, { timestamps: true });

// model 
const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
