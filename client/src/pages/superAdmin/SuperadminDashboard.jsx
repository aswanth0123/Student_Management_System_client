import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const SuperadminDashboard = () => {
  // Placeholder values; replace with real data fetching if needed
  const totalUsers = 0;
  const totalStaffs = 0;
  const totalStudents = 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" sx={{ color: '#111', mb: 3, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Welcome to the Super Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Staffs</Typography>
            <Typography variant="h4">{totalStaffs}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h4">{totalStudents}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperadminDashboard;
