import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './user.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // Add other reducers here
  },
});

export default store; 