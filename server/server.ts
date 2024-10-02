import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import ProductRotues from './routes/Products'
import UserRoutes from './routes/Users'
import ReviewsRoutes from './routes/Reviews'
import cors from "cors"
import ordersRoute from './routes/Orders';

const app = express();

// middleware

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // local development
  'https://mern-e-commerce-fawn.vercel.app/' // deployed backend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials
}));

// Handle preflight requests
app.options('*', cors());


//Connect to db

// Ensure DB connection string exists
const dbConnectionString = process.env.DB_CONN_STRING;

if (!dbConnectionString) {
  throw new Error("DB connection string is not defined in the environment variables.");
}

mongoose.connect(dbConnectionString)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server works on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });

// routes
app.use('/api/products', ProductRotues)
app.use('/api/users', UserRoutes)
app.use('/api/reviews', ReviewsRoutes)
app.use('/api/orders', ordersRoute)

export default app;