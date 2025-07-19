import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create Student
export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/students`,
        studentData,
        { withCredentials: true }
      );
      return response.data.student;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create student'
      );
    }
  }
);

// Get All Students
export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/students`,
        { withCredentials: true }
      );
      return response.data.students;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch students'
      );
    }
  }
);

// Get Student by ID
export const fetchStudentById = createAsyncThunk(
  'student/fetchStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/students/${id}`,
        { withCredentials: true }
      );
      return response.data.student;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch student'
      );
    }
  }
);

// Update Student
export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/students/${id}`,
        studentData,
        { withCredentials: true }
      );
      return response.data.student;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update student'
      );
    }
  }
);

// Delete Student
export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/students/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete student'
      );
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    currentStudent: null,
    loading: false,
    error: null,
    success: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false
  },
  reducers: {
    resetStudentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
    },
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.createLoading = false;
        state.students.unshift(action.payload);
        state.success = true;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.students.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.currentStudent = action.payload;
        state.success = true;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.students = state.students.filter(s => s._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { resetStudentState, clearCurrentStudent, clearError } = studentSlice.actions;
export default studentSlice.reducer; 