import React, { useState, useEffect } from 'react';
import UsersList from '../../Components/common/UsersList';
import AddModal from '../../Components/common/AddModal';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchStaffByRole, resetUserState } from '../../redux/user.slice';
import { toast } from 'react-toastify';

const Staffs = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, staffs, success } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchStaffByRole('Staff'));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Refresh staff list after successful add
  useEffect(() => {
    if (success) {
      dispatch(fetchStaffByRole('Staff'));
      dispatch(resetUserState()); // Optionally reset success/error state
      setOpen(false); // Optionally close modal
      toast.success('Staff added successfully!');
    }
  }, [success, dispatch]);

  const handleAddStaff = (newStaff) => {
    dispatch(createUser({ ...newStaff, role: 'Staff' }));
  };

  return (
    <div className="p-8">
      <div className="flex justify-end mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Staff'}
        </button>
      </div>
      {staffs && staffs.length > 0 ? (
        <UsersList users={staffs} />
      ) : (
        <div className="text-gray-500 text-center">No staff found.</div>
      )}
      <AddModal open={open} onClose={() => setOpen(false)} onSubmit={handleAddStaff} />
    </div>
  );
};

export default Staffs;
