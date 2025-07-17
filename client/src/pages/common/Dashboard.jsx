import React from 'react';
import Sidebar from '../../Components/common/SIdebar';

const Dashboard = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
