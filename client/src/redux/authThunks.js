import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email, password },
      { withCredentials: true }
    );
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    console.log('Login error:', error.response);
    if (error.response) {
      console.log('Error data:', error.response.data);
    }
    let message = 'Login failed';
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    dispatch(loginFailure(message));
  }
};

export const getCurrentUser = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.get('http://localhost:5000/api/auth/getCurrentUser', {
      withCredentials: true,
    });
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(logout());
  }
}; 