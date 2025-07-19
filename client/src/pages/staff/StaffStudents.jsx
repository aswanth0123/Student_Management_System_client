import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import StudentList from '../../components/StudentList';
import StudentModal from '../../components/StudentModal';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent, 
  resetStudentState 
} from '../../redux/studentSlice';
import { toast } from 'react-toastify';

const StaffStudents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  
  const dispatch = useDispatch();
  const { 
    students, 
    loading, 
    error, 
    success, 
    createLoading, 
    updateLoading, 
    deleteLoading 
  } = useSelector((state) => state.student);
  const { user, permissions } = useSelector((state) => state.staffAuth);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(modalMode === 'add' ? 'Student added successfully!' : 'Student updated successfully!');
      setModalOpen(false);
      setSelectedStudent(null);
      setModalMode('add');
      dispatch(resetStudentState());
    }
  }, [success, modalMode, dispatch]);

  const handleAddStudent = () => {
    setModalMode('add');
    setSelectedStudent(null);
    setViewMode(false);
    setModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setViewMode(false);
    setModalOpen(true);
  };

  const handleViewStudent = (student) => {
    setModalMode('view');
    setSelectedStudent(student);
    setViewMode(true);
    setModalOpen(true);
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(studentId));
    }
  };

  const handleSubmit = (studentData) => {
    if (modalMode === 'add') {
      dispatch(createStudent(studentData));
    } else if (modalMode === 'edit') {
      dispatch(updateStudent({ id: selectedStudent._id, studentData }));
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
    setModalMode('add');
    setViewMode(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Management
        </Typography>
        {permissions?.students?.canCreate && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddStudent}
            disabled={createLoading}
            sx={{ backgroundColor: '#1976d2' }}
          >
            {createLoading ? <CircularProgress size={20} color="inherit" /> : 'Add Student'}
          </Button>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <StudentList
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          onView={handleViewStudent}
          userRole={user?.role}
          permissions={permissions}
        />
      )}

      <StudentModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        student={selectedStudent}
        mode={modalMode}
        viewMode={viewMode}
      />
    </Box>
  );
};

export default StaffStudents; 