import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Edit, Delete, Security } from '@mui/icons-material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllStaffPermissions, 
  assignStaffPermissions, 
  updateStaffPermissions, 
  removeStaffPermissions,
  resetStaffPermissionState 
} from '../../redux/staffPermissionSlice';
import { fetchStaffByRole } from '../../redux/user.slice';
import { toast } from 'react-toastify';

const StaffPermissions = () => {
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [permissions, setPermissions] = useState({
    students: {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false
    }
  });
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const { 
    staffPermissions, 
    loading, 
    error, 
    success, 
    assignLoading, 
    updateLoading, 
    removeLoading 
  } = useSelector((state) => state.staffPermission);
  const { staffs } = useSelector((state) => state.user);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchAllStaffPermissions());
    dispatch(fetchStaffByRole('Staff'));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success === 'add') {
      toast.success('Staff added successfully!');
      dispatch(resetStaffPermissionState());
    } else if (success === 'edit') {
      toast.success('Staff updated successfully!');
      dispatch(resetStaffPermissionState());
    } else if (success === 'delete') {
      toast.success('Staff deleted successfully!');
      dispatch(resetStaffPermissionState());
    }
  }, [success, dispatch]);

  const handleAssignPermissions = (staff) => {
    setSelectedStaff(staff);
    setIsEdit(false);
    setPermissions({
      students: {
        canCreate: false,
        canRead: false,
        canUpdate: false,
        canDelete: false
      }
    });
    setPermissionModalOpen(true);
  };

  const handleEditPermissions = (staff) => {
    const existingPermission = staffPermissions.find(p => p.staffId._id === staff._id);
    if (existingPermission) {
      setPermissions(existingPermission.permissions);
      setIsEdit(true);
    } else {
      setPermissions({
        students: {
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false
        }
      });
      setIsEdit(false);
    }
    setSelectedStaff(staff);
    setPermissionModalOpen(true);
  };

  const handleDeletePermissions = async (staffId) => {
    if (window.confirm('Are you sure you want to remove all permissions for this staff member?')) {
      dispatch(removeStaffPermissions(staffId));
    }
  };

  const handlePermissionChange = (module, permission) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module][permission]
      }
    }));
  };

  const handleSubmitPermissions = () => {
    if (isEdit) {
      dispatch(updateStaffPermissions({ 
        staffId: selectedStaff._id, 
        permissions 
      }));
    } else {
      dispatch(assignStaffPermissions({ 
        staffId: selectedStaff._id, 
        permissions 
      }));
    }
  };

  const handleCloseModal = () => {
    setPermissionModalOpen(false);
    setSelectedStaff(null);
    setIsEdit(false);
    setPermissions({
      students: {
        canCreate: false,
        canRead: false,
        canUpdate: false,
        canDelete: false
      }
    });
  };

  const getPermissionChips = (staffId) => {
    const permission = staffPermissions.find(p => p.staffId._id === staffId);
    if (!permission) {
      return <Chip label="No Permissions" color="default" size="small" />;
    }

    const studentPerms = permission.permissions.students;
    const activePerms = [];
    
    if (studentPerms.canCreate) activePerms.push('Create Students');
    if (studentPerms.canRead) activePerms.push('View Students');
    if (studentPerms.canUpdate) activePerms.push('Edit Students');
    if (studentPerms.canDelete) activePerms.push('Delete Students');

    return activePerms.length > 0 ? (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {activePerms.map((perm, index) => (
          <Chip 
            key={index} 
            label={perm} 
            color="primary" 
            size="small" 
            variant="outlined"
          />
        ))}
      </Box>
    ) : (
      <Chip label="No Permissions" color="default" size="small" />
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Staff Permission Management
      </Typography>
      {isMobile ? (
        <Box sx={{ mt: 2 }}>
          {staffs.map((staff) => (
            <Accordion key={staff._id} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ backgroundColor: '#f8f9fa', borderRadius: '8px 8px 0 0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                  <CircleIcon sx={{ color: staff.isActive ? '#4CAF50' : '#F44336', fontSize: 16 }} />
                  <Typography variant="subtitle1" fontWeight="medium">{staff.name}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  Email: {staff.email}
                </Typography>
                <Box sx={{ mb: 1 }}>{getPermissionChips(staff._id)}</Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => handleAssignPermissions(staff)} sx={{ color: '#4CAF50' }} title="Assign Permissions">
                    <Security />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEditPermissions(staff)} sx={{ color: '#FF9800' }} title="Edit Permissions">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeletePermissions(staff._id)} sx={{ color: '#F44336' }} title="Remove Permissions">
                    <Delete />
                  </IconButton>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Paper sx={{ mt: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Staff Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Current Permissions</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffs.map((staff) => (
                  <TableRow key={staff._id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {staff.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>
                      {getPermissionChips(staff._id)}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleAssignPermissions(staff)}
                          sx={{ color: '#4CAF50' }}
                          title="Assign Permissions"
                        >
                          <Security />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditPermissions(staff)}
                          sx={{ color: '#FF9800' }}
                          title="Edit Permissions"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePermissions(staff._id)}
                          sx={{ color: '#F44336' }}
                          title="Remove Permissions"
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
        </Paper>
      )}
      {/* Permission Assignment Modal */}
      <Dialog 
        open={permissionModalOpen} 
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          {isEdit ? 'Edit Staff Permissions' : 'Assign Staff Permissions'}
          {selectedStaff && (
            <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              {selectedStaff.name} ({selectedStaff.email})
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, sm: 3 } }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Student Management Permissions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.students.canCreate}
                    onChange={() => handlePermissionChange('students', 'canCreate')}
                  />
                }
                label="Can Create Students"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.students.canRead}
                    onChange={() => handlePermissionChange('students', 'canRead')}
                  />
                }
                label="Can View Students"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.students.canUpdate}
                    onChange={() => handlePermissionChange('students', 'canUpdate')}
                  />
                }
                label="Can Edit Students"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.students.canDelete}
                    onChange={() => handlePermissionChange('students', 'canDelete')}
                  />
                }
                label="Can Delete Students"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1, sm: 2 } }}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button 
            onClick={handleSubmitPermissions}
            variant="contained"
            disabled={assignLoading || updateLoading}
          >
            {assignLoading || updateLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              isEdit ? 'Update Permissions' : 'Assign Permissions'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffPermissions; 