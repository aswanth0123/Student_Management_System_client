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
  Alert
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95vw', sm: 600 },
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  borderRadius: 2,
  overflow: 'auto'
};

const grades = [
  'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
  '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'
];

const StudentModal = ({ open, onClose, onSubmit, student = null, mode = 'add', viewMode = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    contactInfo: {
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    },
    parentName: '',
    parentContact: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student && mode === 'edit') {
      setFormData({
        name: student.name || '',
        age: student.age || '',
        grade: student.grade || '',
        contactInfo: {
          email: student.contactInfo?.email || '',
          phone: student.contactInfo?.phone || '',
          address: {
            street: student.contactInfo?.address?.street || '',
            city: student.contactInfo?.address?.city || '',
            state: student.contactInfo?.address?.state || '',
            zipCode: student.contactInfo?.address?.zipCode || ''
          }
        },
        parentName: student.parentName || '',
        parentContact: student.parentContact || ''
      });
    } else {
      setFormData({
        name: '',
        age: '',
        grade: '',
        contactInfo: {
          email: '',
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          }
        },
        parentName: '',
        parentContact: ''
      });
    }
    setErrors({});
  }, [student, mode, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (formData.age && (formData.age < 3 || formData.age > 25)) {
      newErrors.age = 'Age must be between 3 and 25';
    }
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.contactInfo.email) newErrors.email = 'Email is required';
    if (!formData.contactInfo.phone) newErrors.phone = 'Phone is required';
    if (!formData.parentName) newErrors.parentName = 'Parent name is required';
    if (!formData.parentContact) newErrors.parentContact = 'Parent contact is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactInfo.email && !emailRegex.test(formData.contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (field.includes('address.')) {
      const addressField = field.split('address.')[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          address: {
            ...prev.contactInfo.address,
            [addressField]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '2rem' } }}>
          {mode === 'add' ? 'Add New Student' : mode === 'edit' ? 'Edit Student' : 'View Student'}
        </Typography>

        <form onSubmit={handleSubmit}>
          {viewMode && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="info">
                This is a read-only view. You can only view student information.
              </Alert>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                error={!!errors.age}
                helperText={errors.age}
                margin="normal"
                inputProps={{ min: 3, max: 25 }}
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" error={!!errors.grade}>
                <InputLabel>Grade</InputLabel>
                <Select
                  value={formData.grade}
                  onChange={(e) => handleChange('grade', e.target.value)}
                  label="Grade"
                  disabled={viewMode}
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      {grade}
                    </MenuItem>
                  ))}
                </Select>
                {errors.grade && <Alert severity="error" sx={{ mt: 1 }}>{errors.grade}</Alert>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Parent Name"
                value={formData.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
                error={!!errors.parentName}
                helperText={errors.parentName}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Parent Contact"
                value={formData.parentContact}
                onChange={(e) => handleChange('parentContact', e.target.value)}
                error={!!errors.parentContact}
                helperText={errors.parentContact}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student Email"
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange('contactInfo.email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student Phone"
                value={formData.contactInfo.phone}
                onChange={(e) => handleChange('contactInfo.phone', e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Address (Optional)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street"
                value={formData.contactInfo.address.street}
                onChange={(e) => handleChange('address.street', e.target.value)}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.contactInfo.address.city}
                onChange={(e) => handleChange('address.city', e.target.value)}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={formData.contactInfo.address.state}
                onChange={(e) => handleChange('address.state', e.target.value)}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={formData.contactInfo.address.zipCode}
                onChange={(e) => handleChange('address.zipCode', e.target.value)}
                margin="normal"
                disabled={viewMode}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onClose}>
              {viewMode ? 'Close' : 'Cancel'}
            </Button>
            {!viewMode && (
              <Button variant="contained" type="submit">
                {mode === 'add' ? 'Add Student' : 'Update Student'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentModal; 