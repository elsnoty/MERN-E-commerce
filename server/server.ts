import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import ProductRoutes from './routes/Products';
import UserRoutes from './routes/Users';
import ReviewsRoutes from './routes/Reviews';
import cors from "cors";
import ordersRoute from './routes/Orders';

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://mern-e-commerce-yl8m.vercel.app', // Frontend deployment (no trailing slash)
  'https://mern-e-commerce-fawn.vercel.app'  // Backend deployment
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow requests from specified origins
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, etc.)
}));

// Handle preflight requests
app.options('*', cors());

// Middleware to parse incoming requests
app.use(express.json());

// Ensure DB connection string exists
const dbConnectionString = process.env.DB_CONN_STRING;

if (!dbConnectionString) {
  throw new Error("DB connection string is not defined in the environment variables.");
}

// Connect to MongoDB
mongoose.connect(dbConnectionString)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });

// Routes
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/reviews', ReviewsRoutes);
app.use('/api/orders', ordersRoute);

export default app;
