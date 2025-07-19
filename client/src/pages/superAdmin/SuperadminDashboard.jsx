import React, { useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffByRole } from '../../redux/user.slice';
import { fetchStudents } from '../../redux/studentSlice';

const SuperadminDashboard = () => {
  const dispatch = useDispatch();
  const totalUsers = 0;
  const totalStaffs = 0;
  const totalStudents = 0;
  const {staffs} = useSelector((state)=>state.user)
  const {students} = useSelector((state)=>state.student)
  useEffect(() => {
    dispatch(fetchStaffByRole('Staff'));
    dispatch(fetchStudents());

  }, [dispatch]);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" sx={{ color: '#111', mb: 3, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Welcome to the Super Admin Dashboard
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Total staffs</Typography>
            <Typography variant="h4">{staffs.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h4">{students.length}</Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default SuperadminDashboard;
