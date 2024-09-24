"use client"
import { createSlice, configureStore } from '@reduxjs/toolkit';

interface ProductState {
  selectedCategories: string[];
}

const initialState: ProductState = {
  selectedCategories: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.selectedCategories = action.payload;
    },
    toggleCategory(state, action) {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
  },
});

export const { setCategories, toggleCategory } = productSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});


export default store;
