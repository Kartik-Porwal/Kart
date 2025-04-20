import {createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
    'auth/register',
    async(userData, {rejectWithValue}) => {
        try{
            const res = await axios.post('http://localhost:5000/api/user/Register', userData, {withCredentials: true,});
            //console.log('API response: ',res.data);
            return res.data;
        } catch(err){
           return rejectWithValue(err.response.data);
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/login',
    async(userData, {rejectWithValue}) => {
        try{
            const res = await axios.post('http://localhost:5000/api/user/SignIn', userData, {withCredentials: true,});
            return res.data;
        } catch(err){
          return rejectWithValue(err.response.data);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async() => {
   const res = await axios.post('http://localhost:5000/api/user/logout',{},{withCredentials: true,})
   return res.data;
  });


  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isLoggedIn: false,
      isRegistered: false,
      user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        token: null
      }, // User info after login
      loading: false, // Loading state for API requests
      error: null, // Error state for API failures
    },
    reducers: {
      setUser: (state, action) => {},
      clearAuthState: (state) => {
        state.isLoggedIn= false;
        state.isRegistered= false;
        state.user= {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          token: null
        }; // User info after login
        state.loading= false; // Loading state for API requests
        state.error= null; 
      },
    },
    extraReducers: (builder) => {
      builder
        // Register case
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.isRegistered = false;
          state.isLoggedIn = false;
        })
        .addCase(register.fulfilled, (state, action) => {
         // console.log("payload in reducer: ", action.payload);
          state.loading = false;
          state.user = {
            id: action.payload._id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            token: action.payload.token,
          };
          state.isLoggedIn = true;
          state.isRegistered = true;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          if (action.payload?.message === 'User already exists') {
            state.error = "This email is already registered. Please use another email.";
        } else {
            state.error = action.payload?.message || "Something went wrong. Please try again.";
        }
          state.isRegistered = false;
        })
        
        // Login case
        .addCase(signIn.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.isLoggedIn = false;
        })
        .addCase(signIn.fulfilled, (state, action) => {
          state.loading = false;
          state.user = {
            email: action.payload.email,
            token: action.payload.token,
          };
          state.isLoggedIn = true;
          state.isRegistered = true;

        })
        .addCase(signIn.rejected, (state, action) => {
          state.loading = false;
          if(action.payload?.message === 'User not found'){
            state.error = "This email is not registered. Please register it first."
          }
          else if(action.payload?.message === 'Password validation failed' || 'Incorrect password'){
            state.error = "Password is incorrect. Please try again."
          }
          else {
            state.error = action.payload?.message || "Something went wrong. Please try again.";
          }
          state.isLoggedIn = false;
        })
  
        // Logout case
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
          state.token = null;
          state.loading = false;
          state.isLoggedIn = false;
        });
    },
  });
  export const isLoggedIn = (state) => state.auth.isLoggedIn;
  export const isRegistered = (state) => state.auth.isRegistered;
  export const loading = (state) => state.auth.loading;
  export const error = (state) => state.auth.error;
  export const user = (state) => state.auth.user;
  export const { setUser, clearAuthState } = authSlice.actions;
  
  export default authSlice.reducer;