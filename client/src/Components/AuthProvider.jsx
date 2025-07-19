import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAuth, loginSuccess } from '../redux/authSlice';
import { logout as logoutStaffAuth, loginSuccess as staffLoginSuccess } from '../redux/staffAuthSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SessionTimeoutWarning from './SessionTimeoutWarning';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated: authIsAuthenticated, user: authUser } = useSelector((state) => state.auth);
  const { isAuthenticated: staffIsAuthenticated, user: staffUser } = useSelector((state) => state.staffAuth);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        console.log('Checking existing authentication...');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          const user = data.user;
          console.log('User found:', user);
          
          // Handle both string role and object role
          const userRole = typeof user.role === 'string' ? user.role : user.role?.name;
          console.log('User role:', userRole);
          
          if (userRole === 'Super_Admin') {
            dispatch(loginSuccess(user));
            localStorage.setItem('lastActivity', Date.now().toString());
            console.log('Super Admin authenticated');
                      } else if (userRole === 'Staff') {
            // For staff, we need to fetch permissions too
            try {
              const permissionsResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/staff-permissions/my-permissions`,
                { credentials: 'include' }
              );
              
              let permissionsData;
              if (permissionsResponse.ok) {
                permissionsData = await permissionsResponse.json();
              } else {
                permissionsData = { 
                  staffPermission: { 
                    permissions: { 
                      students: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } 
                    } 
                  } 
                };
              }
              
              dispatch(staffLoginSuccess({
                user: user,
                permissions: permissionsData.staffPermission?.permissions || {
                  students: { canCreate: false, canRead: false, canUpdate: false, canDelete: false }
                }
              }));
              localStorage.setItem('lastActivity', Date.now().toString());
              console.log('Staff authenticated with permissions');
            } catch (permissionError) {
              // If permissions fetch fails, still login with default permissions
              dispatch(staffLoginSuccess({
                user: user,
                permissions: { students: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } }
              }));
              localStorage.setItem('lastActivity', Date.now().toString());
              console.log('Staff authenticated with default permissions');
            }
          }
        } else {
          console.log('Auth check failed, status:', response.status);
        }
      } catch (error) {
        console.log('Auth check error:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    // Always check for existing authentication on app load
    checkExistingAuth();
  }, []); // Run only once on mount

  useEffect(() => {
    // Check for token expiry every 5 minutes
    const checkTokenExpiry = async () => {
      try {
        console.log('Checking token expiry...');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: 'include',
        });
        
        if (!response.ok) {
          console.log('Token check failed, status:', response.status);
          // Only logout if it's an authentication error (401, 403) or server error (500)
          if (response.status === 401 || response.status === 403 || response.status === 500) {
            console.log('Logging out due to auth error');
            handleLogout();
          }
        } else {
          console.log('Token is still valid');
        }
      } catch (error) {
        console.log('Token check error:', error);
        // Network error or token expired
        handleLogout();
      }
    };

    // Set up interval to check token expiry
    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000); // 5 minutes

    // Only check immediately if user was already authenticated (not fresh login)
    if ((authIsAuthenticated || staffIsAuthenticated) && localStorage.getItem('lastActivity')) {
      checkTokenExpiry();
    }

    return () => clearInterval(interval);
  }, [authIsAuthenticated, staffIsAuthenticated]);

  const handleLogout = () => {
    dispatch(logoutAuth());
    dispatch(logoutStaffAuth());
    
    // Clear cookies
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(error => {
      console.error('Logout error:', error);
    });

    toast.info('Session expired. Please log in again.');
    navigate('/login');
  };

  // Handle page visibility change (user switches tabs)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && (authIsAuthenticated || staffIsAuthenticated)) {
        console.log('Page became visible, checking auth...');
        // Check token when user returns to the tab
        fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: 'include',
        }).then((response) => {
          if (!response.ok) {
            console.log('Visibility check failed, logging out');
            handleLogout();
          } else {
            console.log('Visibility check passed');
          }
        }).catch((error) => {
          console.log('Visibility check error:', error);
          handleLogout();
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [authIsAuthenticated, staffIsAuthenticated]);

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      if (authIsAuthenticated || staffIsAuthenticated) {
        localStorage.setItem('lastActivity', Date.now().toString());
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [authIsAuthenticated, staffIsAuthenticated]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      {children}
      <SessionTimeoutWarning />
    </>
  );
};

export default AuthProvider; 