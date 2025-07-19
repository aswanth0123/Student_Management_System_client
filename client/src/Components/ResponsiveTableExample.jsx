import React from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { Edit, Delete, Visibility, Person, Email } from '@mui/icons-material';
import ResponsiveTable from './ResponsiveTable';

// Example of how to use the ResponsiveTable component
const ResponsiveTableExample = ({ data, onEdit, onDelete, onView }) => {
  // Define table columns for desktop view
  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, item) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person sx={{ color: '#1976d2' }} />
          <Typography variant="subtitle2" fontWeight="medium">
            {value}
          </Typography>
        </Box>
      )
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Email sx={{ color: '#666', fontSize: 16 }} />
          <Typography variant="body2">{value}</Typography>
        </Box>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <Chip
          label={value?.name || 'Staff'}
          size="small"
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            fontWeight: 'medium'
          }}
        />
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Chip
          label={value ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            backgroundColor: value ? '#4CAF50' : '#F44336',
            color: 'white',
            fontWeight: 'medium'
          }}
        />
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, item) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => onView(item)}
            sx={{ color: '#2196F3' }}
            title="View"
          >
            <Visibility />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEdit(item)}
            sx={{ color: '#FF9800' }}
            title="Edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(item._id)}
            sx={{ color: '#F44336' }}
            title="Delete"
          >
            <Delete />
          </IconButton>
        </Box>
      )
    }
  ];

  // Define mobile configuration
  const mobileConfig = {
    // Render the summary (header) of each accordion card
    renderSummary: (item) => (
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
        <Person sx={{ color: '#1976d2', fontSize: 24 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.email}
          </Typography>
        </Box>
        <Chip
          label={item.role?.name || 'Staff'}
          size="small"
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            fontWeight: 'medium',
            fontSize: '0.7rem'
          }}
        />
      </Box>
    ),
    
    // Render the details (expanded content) of each accordion card
    renderDetails: (item) => [
      <Box key="email" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Email sx={{ color: '#666', fontSize: 16 }} />
        <Typography variant="body2">
          <strong>Email:</strong> {item.email}
        </Typography>
      </Box>,
      <Box key="status" sx={{ mb: 1 }}>
        <Typography variant="body2">
          <strong>Status:</strong> {item.isActive ? 'Active' : 'Inactive'}
        </Typography>
      </Box>,
      <Box key="actions" sx={{ display: 'flex', justifyContent: 'space-around', gap: 1, mt: 2 }}>
        <IconButton
          size="small"
          onClick={() => onView(item)}
          sx={{ 
            color: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.2)' }
          }}
          title="View"
        >
          <Visibility />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onEdit(item)}
          sx={{ 
            color: '#FF9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.2)' }
          }}
          title="Edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onDelete(item._id)}
          sx={{ 
            color: '#F44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.2)' }
          }}
          title="Delete"
        >
          <Delete />
        </IconButton>
      </Box>
    ]
  };

  return (
    <ResponsiveTable
      data={data}
      columns={columns}
      mobileConfig={mobileConfig}
      emptyMessage="No staff members found"
      elevation={2}
    />
  );
};

export default ResponsiveTableExample; 