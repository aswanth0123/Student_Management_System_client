import React, { useState, useEffect } from 'react';
import UsersList from '../../Components/common/UsersList';
import AddModal from '../../Components/common/AddModal';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchStudentByRole, resetUserState } from '../../redux/user.slice';
import { toast } from 'react-toastify';

const Students = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, students, success } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchStudentByRole('Student'));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Refresh student list after successful add
  useEffect(() => {
    if (success) {
      dispatch(fetchStudentByRole('Student'));
      dispatch(resetUserState());
      setOpen(false);
      toast.success('Student added successfully!');
    }
  }, [success, dispatch]);

  const handleAddStudent = (newStudent) => {
    dispatch(createUser({ ...newStudent, role: 'Student' }));
  };

  return (
    <div className="p-8">
      <div className="flex justify-end mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </div>
      {students && students.length > 0 ? (
        <UsersList users={students} />
      ) : (
        <div className="text-gray-500 text-center">No students found.</div>
      )}
      <AddModal open={open} onClose={() => setOpen(false)} onSubmit={handleAddStudent} />
    </div>
  );
};

export default Students;
