import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import SuperadminDashboard from './pages/superAdmin/SuperadminDashboard';
import Students from './pages/superAdmin/Students';
import Staffs from './pages/superAdmin/Staffs';
import CommonDashboardLayout from './layouts/CommonDashboardLayout';
import { ToastContainer } from "react-toastify";

const superadminSidebarItems = [
  { label: 'Dashboard', icon: <span>🏠</span>, path: '/dashboard' },
  { label: 'Staffs', icon: <span>🧑‍💼</span>, path: '/superadmin/staffs' },
  { label: 'Students', icon: <span>🎓</span>, path: '/superadmin/students' },
  { label: 'Logout', icon: <span>🚪</span>, path: '/login' },
];

function DashboardLayout({ children }) {
  return <CommonDashboardLayout sidebarItems={superadminSidebarItems}>{children}</CommonDashboardLayout>;
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<SuperadminDashboard />} />
          <Route path="/superadmin/students" element={<Students />} />
          <Route path="/superadmin/staffs" element={<Staffs />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
