import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/add`,
        userData,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Failed to add user' }
      );
    }
  }
);

export const fetchStaffByRole = createAsyncThunk(
  'user/fetchUsersByRole',
  async (role, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/getall/${role}`,
        { withCredentials: true }
      );
      return response.data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Failed to fetch users' }
      );
    }
  }
);

export const fetchStudentByRole = createAsyncThunk(
  'user/fetchStudentByRole',
  async (role, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/getall/${role}`,
        { withCredentials: true }
      );
      return response.data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Failed to fetch students' }
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/update/${id}`,
        userData,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Failed to update user' }
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/delete/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Failed to delete user' }
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    user: null,
    success: null, // updated from false
    staffs: [],
    students: [],
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.success = null; // updated from false
    },
    clearUserData: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.success = null; // updated from false
      state.staffs = [];
      state.students = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = 'add'; // updated
        if (action.payload.role === 'Staff') {
          state.staffs.push(action.payload);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add user';
        state.success = null;
      })

      // Update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.staffs.findIndex(
          (user) => (user.id || user._id) === action.payload._id
        );
        if (index !== -1) {
          state.staffs[index] = action.payload;
        }
        state.success = 'edit'; // updated
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update user';
        state.success = null;
      })

      // Fetch Staff
      .addCase(fetchStaffByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = action.payload;
      })
      .addCase(fetchStaffByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch users';
      })

      // Fetch Students
      .addCase(fetchStudentByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch students';
      })

      // Delete
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = state.staffs.filter(
          (user) => (user.id || user._id) !== action.payload
        );
        state.students = state.students.filter(
          (user) => (user.id || user._id) !== action.payload
        );
        state.success = 'delete'; // updated
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete user';
        state.success = null;
      });
  },
});

export const { resetUserState, clearUserData } = userSlice.actions;
export default userSlice.reducer;
