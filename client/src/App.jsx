import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/auth/Login';
import SuperadminDashboard from './pages/superAdmin/SuperadminDashboard';
import Students from './pages/superAdmin/Students';
import Staffs from './pages/superAdmin/Staffs';
import StaffPermissions from './pages/superAdmin/StaffPermissions';
import StaffStudents from './pages/staff/StaffStudents';
import StaffDashboard from './pages/staff/StaffDashboard';
import CommonDashboardLayout from './layouts/CommonDashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './components/AuthProvider';
import { ToastContainer } from "react-toastify";

// Default redirect component
const DefaultRedirect = () => {
  const { isAuthenticated: authIsAuthenticated, user: authUser } = useSelector((state) => state.auth);
  const { isAuthenticated: staffIsAuthenticated, user: staffUser } = useSelector((state) => state.staffAuth);
  
  const isAuthenticated = authIsAuthenticated || staffIsAuthenticated;
  const currentUser = authUser || staffUser;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (currentUser?.role === 'Staff') {
    return <Navigate to="/staff/dashboard" replace />;
  } else if (currentUser?.role === 'Super_Admin') {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const superadminSidebarItems = [
  { label: 'Dashboard', icon: <span>🏠</span>, path: '/dashboard' },
  { label: 'Staffs', icon: <span>🧑‍💼</span>, path: '/superadmin/staffs' },
  { label: 'Students', icon: <span>🎓</span>, path: '/superadmin/students' },
  { label: 'Staff Permissions', icon: <span>🔐</span>, path: '/superadmin/staff-permissions' },
];

const staffSidebarItems = [
  { label: 'Dashboard', icon: <span>🏠</span>, path: '/staff/dashboard' },
  { label: 'Students', icon: <span>🎓</span>, path: '/staff/students' },
];

function SuperAdminLayout({ children }) {
  return <CommonDashboardLayout sidebarItems={superadminSidebarItems}>{children}</CommonDashboardLayout>;
}

function StaffLayout({ children }) {
  return <CommonDashboardLayout sidebarItems={staffSidebarItems}>{children}</CommonDashboardLayout>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Super Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Super_Admin']}><SuperAdminLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<SuperadminDashboard />} />
            <Route path="/superadmin/staffs" element={<Staffs />} />
            <Route path="/superadmin/students" element={<Students />} />
            <Route path="/superadmin/staff-permissions" element={<StaffPermissions />} />
          </Route>
          
          {/* Staff Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Staff']}><StaffLayout /></ProtectedRoute>}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/students" element={<StaffStudents />} />
          </Route>
          
          <Route path="*" element={<DefaultRedirect />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
