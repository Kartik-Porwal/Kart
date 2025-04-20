// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch products action
export const fetchProducts = createAsyncThunk('products/fetch', async ({rejectWithValue}) => {
    try{
    const res = await axios.get('/api/products');
  return res.data;
    } catch(err){
        return rejectWithValue(err.response.data);
    }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    noProducts: false,
  },
  reducers: {
    clearProducts: (state) => {
        state.items = [];
        state.noProducts = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.noProducts = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProducts } = productSlice.actions; // Export actions
export default productSlice.reducer;
