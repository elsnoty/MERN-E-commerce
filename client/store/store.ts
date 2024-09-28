import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './CartSlice';
import productReducer from './ProductSlice'; 

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
