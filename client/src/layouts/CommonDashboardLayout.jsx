import React from 'react';
import Sidebar from '../Components/common/SIdebar';
import { Outlet } from 'react-router-dom';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const CommonDashboardLayout = ({ sidebarItems, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar sidebarItems={sidebarItems} />
      <main 
        className="flex-1 overflow-auto"
        style={{
          padding: isMobile ? '16px' : '24px',
          marginLeft: isMobile ? '0' : '0',
        }}
      >
        {children}
        <Outlet />
      </main>
    </div>
  );
};

export default CommonDashboardLayout; 