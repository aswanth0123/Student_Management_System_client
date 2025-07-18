import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    console.log('working ');
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/add`,
        userData,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (error) {
        console.log('===============');
        console.log(error);
        console.log('===============');
        
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
    success: false,
    staffs: [],
    students:[]
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.success = false;
      state.staffs = [];
      state.students =[];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add user';
        state.success = false;
      })
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
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove user from staffs and students arrays if present
        state.staffs = state.staffs.filter((user) => (user.id || user._id) !== action.payload);
        state.students = state.students.filter((user) => (user.id || user._id) !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete user';
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
