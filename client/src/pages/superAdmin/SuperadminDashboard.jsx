import React from 'react';
import CommonDashboardLayout from '../../layouts/CommonDashboardLayout';
import DashboardContent from '../../Components/common/DashboardContent';

const summary = [
  { label: 'Total Users', value: 120 },
  { label: 'Total Students', value: 80 },
  { label: 'Total Courses', value: 15 },
];

const SuperadminDashboard = () => {
  return (
    <DashboardContent title="Welcome to the Super Admin Dashboard" summary={summary} />
  );
};

export default SuperadminDashboard;
