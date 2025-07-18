import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value) => {
    // At least 6 chars, one number, one letter
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters and contain a number.');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (name && email && password && valid) {
      onSubmit({ name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} textAlign="center">Add New Staff</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="email"
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="password"
            error={!!passwordError}
            helperText={passwordError}
          />
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={onClose} sx={{ mr: 2 }} color="secondary" variant="outlined">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Add</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
