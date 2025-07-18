import React, { useState } from 'react';
import { Card, CardContent, Avatar, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/user.slice';
import { toast } from 'react-toastify';

const UsersList = ({ users }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleEdit = () => {
    // Implement edit logic here
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId))
        .unwrap()
        .then(() => {
          toast.success('User deleted successfully!');
        })
        .catch(() => {
          toast.error('Failed to delete user');
        });
    }
    handleMenuClose();
  };

  return (
    <>
      <Typography variant="h4" className="mb-8 font-bold text-blue-700 text-center">
        Users
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id || user._id}>
            <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200" style={{ position: 'relative' }}>
              <IconButton
                aria-label="more"
                aria-controls={`menu-${user.id || user._id}`}
                aria-haspopup="true"
                onClick={(e) => handleMenuOpen(e, user.id || user._id)}
                style={{ position: 'absolute', top: 8, right: 8 }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`menu-${user.id || user._id}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedUserId === (user.id || user._id)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
              <CardContent className="flex flex-col items-center p-6">
                <Avatar
                  src={''}
                  alt={user.name}
                  sx={{ width: 72, height: 72, mb: 2 }}
                >
                  {user.name[0]}
                </Avatar>
                <Typography variant="h6" className="font-semibold mb-1">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UsersList; 