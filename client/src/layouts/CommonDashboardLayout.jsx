import React from 'react';
import Sidebar from '../Components/common/SIdebar';
import { Outlet } from 'react-router-dom';

const CommonDashboardLayout = ({ sidebarItems, children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar sidebarItems={sidebarItems} />
      <main className="flex-1 p-6 overflow-auto">
        {children}
        <Outlet />
      </main>
    </div>
  );
};

export default CommonDashboardLayout; 