import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Check if a product with the same id *and* size already exists in the cart
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; size: string }>) => {
      state.items = state.items.filter(item => !(item.id === action.payload.id && item.size === action.payload.size));
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; size: string; quantity: number }>) => {
      // Find the item based on both ID and size
      const item = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },    
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    },
    saveCartToLocalStorage: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    loadCartFromLocalStorage: (state) => {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          state.items = JSON.parse(savedCart);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, saveCartToLocalStorage, loadCartFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;