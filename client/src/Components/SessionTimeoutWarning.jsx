import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  LinearProgress,
  Box
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout as logoutAuth } from '../redux/authSlice';
import { logout as logoutStaffAuth } from '../redux/staffAuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SessionTimeoutWarning = () => {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds warning
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is active every 30 seconds
    const checkActivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      const now = Date.now();
      
      // Only show warning if there's activity timestamp and enough time has passed
      if (lastActivity && (now - parseInt(lastActivity)) > 25 * 60 * 1000) { // 25 minutes
        setOpen(true);
      }
    };

    // Don't start checking immediately, wait a bit after login
    const initialDelay = setTimeout(() => {
      const interval = setInterval(checkActivity, 30 * 1000); // 30 seconds
      return () => clearInterval(interval);
    }, 60 * 1000); // Wait 1 minute before starting to check

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [open]);

  const handleExtendSession = () => {
    localStorage.setItem('lastActivity', Date.now().toString());
    setOpen(false);
    setTimeLeft(60);
    toast.success('Session extended!');
  };

  const handleLogout = () => {
    dispatch(logoutAuth());
    dispatch(logoutStaffAuth());
    
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(error => {
      console.error('Logout error:', error);
    });

    toast.info('Session expired. Please log in again.');
    navigate('/login');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Session Timeout Warning</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          Your session will expire in {formatTime(timeLeft)}. Would you like to extend your session?
        </Typography>
        
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={((60 - timeLeft) / 60) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        
        <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
          Time remaining: {formatTime(timeLeft)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout} color="error">
          Logout Now
        </Button>
        <Button onClick={handleExtendSession} variant="contained" color="primary">
          Extend Session
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionTimeoutWarning; 