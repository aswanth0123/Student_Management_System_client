import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './user.slice';
import studentReducer from './studentSlice';
import staffPermissionReducer from './staffPermissionSlice';
import staffAuthReducer from './staffAuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    student: studentReducer,
    staffPermission: staffPermissionReducer,
    staffAuth: staffAuthReducer,
  },
});

export default store; 