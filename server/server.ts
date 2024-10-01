const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const ProductRotues = require('./routes/Products')
import UserRoutes from './routes/Users'
import ReviewsRoutes from './routes/Reviews'
const cors = require('cors');
import ordersRoute from './routes/Orders';

const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


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
  .catch((err: any) => {
    console.log("Error connecting to the database: ", err);
  });

// routes
app.use('/api/products', ProductRotues)
/*
app.use('/api/users', UserRoutes)
app.use('/api/reviews', ReviewsRoutes)
app.use('/api/orders', ordersRoute)
*/
module.exports = app;
