import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Button
} from '@mui/material';
import {
  School,
  Visibility,
  Edit,
  Add,
  Delete,
  Security
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const { user, permissions } = useSelector((state) => state.staffAuth);
  const navigate = useNavigate();

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case 'canRead':
        return <Visibility />;
      case 'canCreate':
        return <Add />;
      case 'canUpdate':
        return <Edit />;
      case 'canDelete':
        return <Delete />;
      default:
        return <Security />;
    }
  };

  const getPermissionColor = (hasPermission) => {
    return hasPermission ? 'success' : 'default';
  };

  const getPermissionLabel = (permission) => {
    switch (permission) {
      case 'canRead':
        return 'View Students';
      case 'canCreate':
        return 'Create Students';
      case 'canUpdate':
        return 'Edit Students';
      case 'canDelete':
        return 'Delete Students';
      default:
        return permission;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Staff Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Welcome, {user?.name}!
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              You are logged in as a Staff member. Your access to student records is based on the permissions assigned by the Super Admin.
            </Typography>
            <Button
              variant="contained"
              startIcon={<School />}
              onClick={() => navigate('/staff/students')}
              sx={{ mt: 2 }}
            >
              Go to Students
            </Button>
          </Paper>
        </Grid>

        {/* Permissions Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Your Permissions
            </Typography>
            {permissions ? (
              <Box sx={{ mt: 2 }}>
                {Object.entries(permissions.students || {}).map(([permission, hasPermission]) => (
                  <Chip
                    key={permission}
                    icon={getPermissionIcon(permission)}
                    label={getPermissionLabel(permission)}
                    color={getPermissionColor(hasPermission)}
                    variant={hasPermission ? 'filled' : 'outlined'}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No permissions assigned yet.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Information Card */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              How It Works
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Visibility sx={{ mr: 1, verticalAlign: 'middle' }} />
                      View Students
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      You can view student records if you have view permission.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Add sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Create Students
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      You can add new students if you have create permission.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Edit sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Edit Students
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      You can modify student records if you have edit permission.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* No Permissions Alert */}
        {permissions && !Object.values(permissions.students || {}).some(Boolean) && (
          <Grid item xs={12}>
            <Alert severity="info">
              <Typography variant="body2">
                You currently have no permissions assigned. Please contact the Super Admin to get access to student records.
              </Typography>
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default StaffDashboard; 