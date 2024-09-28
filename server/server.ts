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
app.use(express.json());
app.use(cors())

//Connect to db

// Ensure DB connection string exists
const dbConnectionString = process.env.DB_CONN_STRING;

if (!dbConnectionString) {
  throw new Error("DB connection string is not defined in the environment variables.");
}

mongoose.connect(dbConnectionString)
  .then(() => {
    app.listen(process.env.PORT || 3002, () => {
      console.log(`Server works on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });

// routes
app.use('/api', ProductRotues)
app.use('/api', UserRoutes)
app.use('/api', ReviewsRoutes)
app.use('/api', ordersRoute)