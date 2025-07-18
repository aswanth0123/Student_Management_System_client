import React from 'react';
import CommonDashboardLayout from '../../layouts/CommonDashboardLayout';
import DashboardContent from '../../Components/common/DashboardContent';

const superadminSidebarItems = [
  { label: 'Dashboard', icon: <span>🏠</span>, path: '/dashboard' },
  { label: 'Users', icon: <span>👥</span>, path: '/superadmin/users' },
  { label: 'Students', icon: <span>🎓</span>, path: '/superadmin/students' },
  { label: 'Staffs', icon: <span>🧑‍💼</span>, path: '/superadmin/staffs' },
  { label: 'Logout', icon: <span>🚪</span>, path: '/login' },
];

const summary = [
  { label: 'Total Users', value: 120 },
  { label: 'Total Students', value: 80 },
  { label: 'Total Courses', value: 15 },
];

const Dashboard = () => {
  return (
    <CommonDashboardLayout sidebarItems={superadminSidebarItems}>
      <DashboardContent title="Welcome to the Super Admin Dashboard" summary={summary} />
    </CommonDashboardLayout>
  );
};

export default Dashboard; 