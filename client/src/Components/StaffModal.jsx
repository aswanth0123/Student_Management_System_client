import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', sm: 500 },
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  borderRadius: 2,
  overflow: 'auto'
};

const StaffModal = ({ open, onClose, onSubmit, staff = null, mode = 'add', viewMode = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (staff && mode === 'edit') {
      setFormData({
        name: staff.name || '',
        email: staff.email || '',
        password: '', // Don't populate password for security
        isActive: staff.isActive !== undefined ? staff.isActive : true
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        isActive: true
      });
    }
    setErrors({});
  }, [staff, mode, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    // Only validate password for new staff or if password is provided
    if (mode === 'add' && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Only include password if it's provided
      const submitData = { ...formData };
      if (!submitData.password) {
        delete submitData.password;
      }
      onSubmit(submitData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '2rem' } }}>
          {mode === 'add' ? 'Add New Staff' : mode === 'edit' ? 'Edit Staff' : 'View Staff'}
        </Typography>

        <form onSubmit={handleSubmit}>
          {viewMode && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="info">
                This is a read-only view. You can only view staff information.
              </Alert>
            </Box>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={!!errors.password}
                helperText={errors.password || (mode === 'edit' ? 'Leave blank to keep current password' : '')}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    disabled={viewMode}
                  />
                }
                label="Active Status"
              />
              <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 1 }}>
                {formData.isActive ? 'Staff member can log in and access the system' : 'Staff member is deactivated and cannot log in'}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onClose}>
              {viewMode ? 'Close' : 'Cancel'}
            </Button>
            {!viewMode && (
              <Button variant="contained" type="submit">
                {mode === 'add' ? 'Add Staff' : 'Update Staff'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default StaffModal; 