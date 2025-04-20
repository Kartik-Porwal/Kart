import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from './Slices/AuthSlice';
import productReducer from './Slices/ProductSlice';
/*import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';*/
import uiReducer from './Slices/uiSlice';


// Create Redux store
export const store = configureStore({
    reducer:{
        products: productReducer,
        auth: authReducer,
        ui: uiReducer,
        devTools: process.env.NODE_ENV !== 'production',
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

