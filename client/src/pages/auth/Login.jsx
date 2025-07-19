import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Alert,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authThunks';
import { staffLogin } from '../../redux/staffAuthSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { loading: staffLoading, error: staffError, isAuthenticated: staffIsAuthenticated } = useSelector((state) => state.staffAuth);

  useEffect(() => {
    if (isAuthenticated) {
      // Set activity timestamp for fresh login
      localStorage.setItem('lastActivity', Date.now().toString());
      toast.success('Login successful!');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (staffIsAuthenticated) {
      // Set activity timestamp for fresh login
      localStorage.setItem('lastActivity', Date.now().toString());
      toast.success('Staff login successful!');
      navigate('/staff/dashboard');
    }
  }, [staffIsAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (staffError) {
      toast.error(staffError);
    }
  }, [staffError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }
    setLocalError('');
    
    // Try Super Admin login first
    try {
      await dispatch(login(email, password)).unwrap();
    } catch (error) {
      // If Super Admin login fails, try Staff login
      try {
        await dispatch(staffLogin({ email, password })).unwrap();
      } catch (staffError) {
        // Both logins failed
        console.error('Login failed for both roles:', error, staffError);
      }
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (localError) setLocalError('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      {/* Top Heading */}
      {/* Login Card */}
      <Card
        className="w-full max-w-lg rounded-2xl"
        sx={{ borderRadius: '1.5rem' }}
      >
        <CardContent className="p-12">
          <Typography
            variant="h5"
            align="center"
            className="mb-4"
            sx={{ fontWeight: 700 }}
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              value={email}
              onChange={handleInputChange(setEmail)}
              margin="normal"
              type="email"
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              value={password}
              onChange={handleInputChange(setPassword)}
              margin="normal"
              autoComplete="current-password"
            />

            <Box className="text-right mt-2 mb-4">
              <MuiLink
                href="#"
                className="text-gray-500 text-sm hover:text-blue-600"
                underline="none"
              >
                Forgot Password?
              </MuiLink>
            </Box>

            {localError && (
              <Alert severity="error" className="mb-2 text-sm">
                {localError}
              </Alert>
            )}
            {error && (
              <Alert severity="error" className="mb-3 text-sm">
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#00aaff',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                borderRadius: '9999px',
                py: 2,
                mb: 3,
                '&:hover': {
                  backgroundColor: '#0088cc',
                },
              }}
              disabled={loading || staffLoading}
            >
              {loading || staffLoading ? 'Logging in...' : 'Login'}
            </Button>

            {/* <Box textAlign="center">
              <Typography variant="body2">
                Not a member?{' '}
                <MuiLink href="#" underline="none" className="text-blue-600 font-semibold">
                  Signup
                </MuiLink>
              </Typography>
            </Box> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
