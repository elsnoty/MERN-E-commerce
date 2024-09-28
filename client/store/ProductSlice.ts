import { ProductsProp } from '@/models/Products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
  products: ProductsProp[];
  selectedCategories: string[];
}

const initialState: ProductsState = {
  products: [],
  selectedCategories: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsProp[]>) => {
      state.products = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    clearCategories: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const { setProducts, toggleCategory, clearCategories } = productsSlice.actions;
export const selectProducts = (state: { products: ProductsState }) => state.products.products;
export const selectSelectedCategories = (state: { products: ProductsState }) => state.products.selectedCategories;

export default productsSlice.reducer;
