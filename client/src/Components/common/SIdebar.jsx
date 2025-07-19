import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../../components/LogoutButton';

const defaultSidebarItems = [
  { label: 'Dashboard', icon: <span>🏠</span>, path: '/dashboard' },
  { label: 'Staffs', icon: <span>🧑‍💼</span>, path: '/superadmin/staffs' },
  { label: 'Students', icon: <span>🎓</span>, path: '/superadmin/students' },
  { label: 'Logout', icon: <span>🚪</span>, path: '/login' },
];

const Sidebar = ({ sidebarItems }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user: authUser } = useSelector((state) => state.auth);
  const { user: staffUser } = useSelector((state) => state.staffAuth);
  
  const currentUser = authUser || staffUser;
  const items = sidebarItems || defaultSidebarItems;
  
  return (
    <aside 
      className={`${isMobile ? 'w-16' : 'w-64'} bg-white shadow-lg h-screen flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className={`${isMobile ? 'p-2' : 'p-6'} text-2xl font-bold text-blue-600 tracking-wide border-b flex items-center justify-center`}>
        {isMobile ? (
          <span className="text-xl">🏠</span>
        ) : (
          'Dashboard'
        )}
      </div>
      
      {/* User Info - Hidden on mobile */}
      {!isMobile && currentUser && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" color="textSecondary">
            Welcome,
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {currentUser.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {currentUser.role}
          </Typography>
        </Box>
      )}
      
      {/* Navigation Items */}
      <List className="flex-1">
        {items.filter(item => item.label !== 'Logout').map((item) => (
          <Tooltip 
            title={isMobile ? item.label : ''} 
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                  fontSize: '12px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                }
              }
            }}
          >
            <ListItem
              button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="hover:bg-blue-50"
              sx={{
                minHeight: isMobile ? '48px' : 'auto',
                justifyContent: isMobile ? 'center' : 'flex-start',
                px: isMobile ? 1 : 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: isMobile ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  transform: isMobile ? 'scale(1.05)' : 'none',
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: isMobile ? 'auto' : '40px',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isMobile && <ListItemText primary={item.label} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      
      <Divider />
      
      {/* Logout Section */}
      <Box sx={{ p: isMobile ? 1 : 2 }}>
        <Tooltip 
          title={isMobile ? 'Logout' : ''} 
          placement="right"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                fontSize: '12px',
                padding: '8px 12px',
                borderRadius: '6px',
              }
            }
          }}
        >
          <Box>
            <LogoutButton />
          </Box>
        </Tooltip>
      </Box>
    </aside>
  );
};

export default Sidebar;
