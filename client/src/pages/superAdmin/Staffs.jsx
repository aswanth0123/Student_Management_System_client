import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import StaffList from '../../components/StaffList';
import StaffModal from '../../components/StaffModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStaffByRole,
  createUser,
  updateUser,
  deleteUser,
  resetUserState
} from '../../redux/user.slice';
import { toast } from 'react-toastify';

const Staffs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const dispatch = useDispatch();
  const {
    staffs,
    loading,
    error,
    success,
    createLoading,
    updateLoading,
    deleteLoading
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchStaffByRole('Staff'));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Helper to reset modal state
  const resetModal = () => {
    setModalOpen(false);
    setSelectedStaff(null);
    setModalMode('add');
    setViewMode(false);
  };

  useEffect(() => {
    if (success === 'add' || success === 'edit' || success === 'delete') {
      if (success === 'add') toast.success('Staff added successfully!');
      else if (success === 'edit') toast.success('Staff updated successfully!');
      else if (success === 'delete') toast.success('Staff deleted successfully!');

      resetModal();

      // Reset success state first before re-fetching
      dispatch(resetUserState());
      dispatch(fetchStaffByRole('Staff'));
    }
  }, [success, dispatch]);

  const handleAddStaff = () => {
    setModalMode('add');
    setSelectedStaff(null);
    setViewMode(false);
    setModalOpen(true);
  };

  const handleEditStaff = (staff) => {
    setModalMode('edit');
    setSelectedStaff(staff);
    setViewMode(false);
    setModalOpen(true);
  };

  const handleViewStaff = (staff) => {
    setModalMode('view');
    setSelectedStaff(staff);
    setViewMode(true);
    setModalOpen(true);
  };

  const handleDeleteStaff = (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      dispatch(deleteUser(staffId));
    }
  };

  const handleSubmit = (staffData) => {
    if (modalMode === 'add') {
      dispatch(createUser({ ...staffData, role: 'Staff' }));
    } else if (modalMode === 'edit') {
      dispatch(updateUser({ id: selectedStaff._id, userData: { ...staffData, role: 'Staff' } }));
    }
  };

  const handleCloseModal = () => {
    resetModal();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Staff Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddStaff}
          disabled={createLoading}
          sx={{ backgroundColor: '#1976d2' }}
        >
          {createLoading ? <CircularProgress size={20} color="inherit" /> : 'Add Staff'}
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <StaffList
          staffs={staffs}
          onEdit={handleEditStaff}
          onDelete={handleDeleteStaff}
          onView={handleViewStaff}
        />
      )}

      <StaffModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        staff={selectedStaff}
        mode={modalMode}
        viewMode={viewMode}
      />
    </Box>
  );
};

export default Staffs;
