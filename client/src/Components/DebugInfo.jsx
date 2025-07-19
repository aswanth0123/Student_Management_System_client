import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const DebugInfo = () => {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const authState = useSelector((state) => state.auth);
  const staffAuthState = useSelector((state) => state.staffAuth);

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: 'include',
        });
        
        if (response.status === 401 || response.status === 403) {
          setApiStatus('Connected (Unauthorized - No token)');
        } else if (response.ok) {
          setApiStatus('Connected (Authenticated)');
        } else {
          setApiStatus('Error: ' + response.status);
        }
      } catch (error) {
        setApiStatus('Error: ' + error.message);
      }
    };

    checkApi();
  }, []);

  return (
    <Paper sx={{ p: 2, m: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom>
        Debug Information
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}
        </Typography>
        <Typography variant="body2">
          <strong>API Status:</strong> {apiStatus}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">Auth State:</Typography>
        <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
          {JSON.stringify(authState, null, 2)}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">Staff Auth State:</Typography>
        <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
          {JSON.stringify(staffAuthState, null, 2)}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2">Local Storage:</Typography>
        <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
          {JSON.stringify({
            lastActivity: localStorage.getItem('lastActivity'),
            token: localStorage.getItem('token')
          }, null, 2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DebugInfo; 