import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Visibility, 
  Email, 
  Person, 
  ExpandMore,
  MoreVert,
  Circle
} from '@mui/icons-material';

const StaffList = ({ staffs, onEdit, onDelete, onView }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (isActive) => {
    return isActive ? '#4CAF50' : '#F44336';
  };

  const getStatusDot = (isActive) => {
    return (
      <Circle 
        sx={{ 
          fontSize: 16, 
          color: getStatusColor(isActive)
        }} 
      />
    );
  };

  if (!staffs || staffs.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No staff members found
        </Typography>
      </Box>
    );
  }

  // Mobile Card View
  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        {staffs.map((staff) => (
          <Accordion
            key={staff._id}
            expanded={expandedCard === staff._id}
            onChange={() => setExpandedCard(expandedCard === staff._id ? null : staff._id)}
            sx={{
              mb: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: '8px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px 8px 0 0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                <Person sx={{ color: '#1976d2', fontSize: 24 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {staff.name}
                  </Typography>
                </Box>
                {getStatusDot(staff.isActive)}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email sx={{ color: '#666', fontSize: 16 }} />
                    <Typography variant="body2">
                      <strong>Email:</strong> {staff.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Created:</strong> {formatDate(staff.createdAt)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onView(staff)}
                      sx={{ 
                        color: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.2)' }
                      }}
                      title="View Staff"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(staff)}
                      sx={{ 
                        color: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.2)' }
                      }}
                      title="Edit Staff"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(staff._id)}
                      sx={{ 
                        color: '#F44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.2)' }
                      }}
                      title="Delete Staff"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }

  // Desktop Table View
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Created</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs.map((staff) => (
            <TableRow
              key={staff._id}
              onMouseEnter={() => setHoveredRow(staff._id)}
              onMouseLeave={() => setHoveredRow(null)}
              sx={{
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer'
                }
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person sx={{ color: '#1976d2' }} />
                  <Typography variant="subtitle2" fontWeight="medium">
                    {staff.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ color: '#666', fontSize: 16 }} />
                  <Typography variant="body2">
                    {staff.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={staff.role?.name || 'Staff'}
                  size="small"
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'medium'
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={staff.isActive ? 'Active' : 'Inactive'}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(staff.isActive),
                    color: 'white',
                    fontWeight: 'medium'
                  }}
                />
              </TableCell>
              <TableCell>{formatDate(staff.createdAt)}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onView(staff)}
                    sx={{ color: '#2196F3' }}
                    title="View Staff"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(staff)}
                    sx={{ color: '#FF9800' }}
                    title="Edit Staff"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(staff._id)}
                    sx={{ color: '#F44336' }}
                    title="Delete Staff"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StaffList; 