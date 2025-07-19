import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Assign permissions to staff
export const assignStaffPermissions = createAsyncThunk(
  'staffPermission/assignPermissions',
  async ({ staffId, permissions }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/staff-permissions`,
        { staffId, permissions },
        { withCredentials: true }
      );
      return response.data.staffPermission;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to assign permissions'
      );
    }
  }
);

// Get all staff permissions
export const fetchAllStaffPermissions = createAsyncThunk(
  'staffPermission/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/staff-permissions`,
        { withCredentials: true }
      );
      return response.data.staffPermissions;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch staff permissions'
      );
    }
  }
);

// Get staff permissions by ID
export const fetchStaffPermissions = createAsyncThunk(
  'staffPermission/fetchById',
  async (staffId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/staff-permissions/${staffId}`,
        { withCredentials: true }
      );
      return response.data.staffPermission;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch staff permissions'
      );
    }
  }
);

// Update staff permissions
export const updateStaffPermissions = createAsyncThunk(
  'staffPermission/update',
  async ({ staffId, permissions }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/staff-permissions/${staffId}`,
        { permissions },
        { withCredentials: true }
      );
      return response.data.staffPermission;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update permissions'
      );
    }
  }
);

// Remove staff permissions
export const removeStaffPermissions = createAsyncThunk(
  'staffPermission/remove',
  async (staffId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/staff-permissions/${staffId}`,
        { withCredentials: true }
      );
      return staffId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove permissions'
      );
    }
  }
);

const staffPermissionSlice = createSlice({
  name: 'staffPermission',
  initialState: {
    staffPermissions: [],
    currentPermission: null,
    loading: false,
    error: null,
    success: false,
    assignLoading: false,
    updateLoading: false,
    removeLoading: false
  },
  reducers: {
    resetStaffPermissionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.assignLoading = false;
      state.updateLoading = false;
      state.removeLoading = false;
    },
    clearCurrentPermission: (state) => {
      state.currentPermission = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Assign permissions
      .addCase(assignStaffPermissions.pending, (state) => {
        state.assignLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(assignStaffPermissions.fulfilled, (state, action) => {
        state.assignLoading = false;
        const index = state.staffPermissions.findIndex(p => p.staffId === action.payload.staffId);
        if (index !== -1) {
          state.staffPermissions[index] = action.payload;
        } else {
          state.staffPermissions.push(action.payload);
        }
        state.success = true;
      })
      .addCase(assignStaffPermissions.rejected, (state, action) => {
        state.assignLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch all permissions
      .addCase(fetchAllStaffPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStaffPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.staffPermissions = action.payload;
      })
      .addCase(fetchAllStaffPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch permissions by ID
      .addCase(fetchStaffPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPermission = action.payload;
      })
      .addCase(fetchStaffPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update permissions
      .addCase(updateStaffPermissions.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateStaffPermissions.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.staffPermissions.findIndex(p => p.staffId === action.payload.staffId);
        if (index !== -1) {
          state.staffPermissions[index] = action.payload;
        }
        state.currentPermission = action.payload;
        state.success = true;
      })
      .addCase(updateStaffPermissions.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Remove permissions
      .addCase(removeStaffPermissions.pending, (state) => {
        state.removeLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeStaffPermissions.fulfilled, (state, action) => {
        state.removeLoading = false;
        state.staffPermissions = state.staffPermissions.filter(p => p.staffId !== action.payload);
        state.success = true;
      })
      .addCase(removeStaffPermissions.rejected, (state, action) => {
        state.removeLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { resetStaffPermissionState, clearCurrentPermission, clearError } = staffPermissionSlice.actions;
export default staffPermissionSlice.reducer; 