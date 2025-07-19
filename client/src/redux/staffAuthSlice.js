import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Staff login
export const staffLogin = createAsyncThunk(
  'staffAuth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      
      // If login successful, fetch staff permissions
      if (response.data.user.role === 'Staff') {
        try {
          const permissionsResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/staff-permissions/my-permissions`,
            { withCredentials: true }
          );
          return {
            user: response.data.user,
            permissions: permissionsResponse.data.staffPermission?.permissions || {
              students: {
                canCreate: false,
                canRead: false,
                canUpdate: false,
                canDelete: false
              }
            }
          };
        } catch (permissionError) {
          // If no permissions found, return user with default permissions
          return {
            user: response.data.user,
            permissions: {
              students: {
                canCreate: false,
                canRead: false,
                canUpdate: false,
                canDelete: false
              }
            }
          };
        }
      }
      
      return {
        user: response.data.user,
        permissions: null
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Get current staff user and permissions
export const getCurrentStaffUser = createAsyncThunk(
  'staffAuth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        { withCredentials: true }
      );
      
      if (response.data.user.role === 'Staff') {
        try {
          const permissionsResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/staff-permissions/my-permissions`,
            { withCredentials: true }
          );
          return {
            user: response.data.user,
            permissions: permissionsResponse.data.staffPermission?.permissions || {
              students: {
                canCreate: false,
                canRead: false,
                canUpdate: false,
                canDelete: false
              }
            }
          };
        } catch (permissionError) {
          return {
            user: response.data.user,
            permissions: {
              students: {
                canCreate: false,
                canRead: false,
                canUpdate: false,
                canDelete: false
              }
            }
          };
        }
      }
      
      return {
        user: response.data.user,
        permissions: null
      };
    } catch (error) {
      return rejectWithValue('Authentication failed');
    }
  }
);

const staffAuthSlice = createSlice({
  name: 'staffAuth',
  initialState: {
    user: null,
    permissions: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.permissions = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Staff Login
      .addCase(staffLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(staffLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(staffLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.permissions = null;
        state.isAuthenticated = false;
      })
      // Get Current Staff User
      .addCase(getCurrentStaffUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentStaffUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentStaffUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.permissions = null;
        state.isAuthenticated = false;
      });
  }
});

export const { logout, clearError, loginSuccess } = staffAuthSlice.actions;
export default staffAuthSlice.reducer; 