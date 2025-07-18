import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const defaultSidebarItems = [
  { label: 'Dashboard', icon: <span>🏠</span>, path: '/dashboard' },
  { label: 'Staffs', icon: <span>🧑‍💼</span>, path: '/superadmin/staffs' },
  { label: 'Students', icon: <span>🎓</span>, path: '/superadmin/students' },
  { label: 'Logout', icon: <span>🚪</span>, path: '/login' },
];

const Sidebar = ({ sidebarItems }) => {
  const navigate = useNavigate();
  const items = sidebarItems || defaultSidebarItems;
  return (
    <aside className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-blue-600 tracking-wide border-b">Dashboard</div>
      <List className="flex-1">
        {items.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="hover:bg-blue-50"
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </aside>
  );
};

export default Sidebar;
