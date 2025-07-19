import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout as logoutAuth } from '../redux/authSlice';
import { logout as logoutStaffAuth } from '../redux/staffAuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Clear both auth states
    dispatch(logoutAuth());
    dispatch(logoutStaffAuth());
    
    // Clear cookies by making a logout request to backend
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(error => {
      console.error('Logout error:', error);
    });

    toast.success('Logged out successfully!');
    navigate('/login');
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <IconButton
          onClick={handleLogoutClick}
          sx={{
            color: '#f44336',
            border: '1px solid #f44336',
            '&:hover': {
              backgroundColor: '#f44336',
              color: 'white',
            },
            width: '100%',
            height: '40px',
          }}
        >
          <Logout />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          startIcon={<Logout />}
          onClick={handleLogoutClick}
          fullWidth
          sx={{
            color: '#f44336',
            borderColor: '#f44336',
            '&:hover': {
              backgroundColor: '#f44336',
              color: 'white',
              borderColor: '#f44336',
            },
          }}
        >
          Logout
        </Button>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to logout? You will need to log in again to access the system.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton; 