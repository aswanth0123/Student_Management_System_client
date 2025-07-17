import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const superAdminSidebarItems = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'Staffs', icon: <PeopleIcon /> },
  { label: 'Students', icon: <SchoolIcon /> },
  { label: 'Logout', icon: <LogoutIcon /> },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-blue-600 tracking-wide border-b">Super Admin</div>
      <List className="flex-1">
        {superAdminSidebarItems.map((item) => (
          <ListItem button key={item.label} className="hover:bg-blue-50">
            <ListItemIcon className="text-blue-500">{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Add additional footer or profile info here if needed */}
    </aside>
  );
};

export default Sidebar;
