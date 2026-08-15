import mongoose, { Document } from 'mongoose';

export interface Review extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
  username: string; 
}

const Schema = mongoose.Schema;

const reviewSchema = new Schema<Review>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {  // Add this new field
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
reviewSchema.index({ productId: 1, user: 1 }, { unique: true });

const ReviewModel = mongoose.model<Review>('Review', reviewSchema);

export default ReviewModel;
