# Student Management System - Frontend

A React.js frontend for the Student Management System with Material-UI components and Redux state management.

## Features

- **Modern UI**: Material-UI components with responsive design
- **State Management**: Redux Toolkit for centralized state management
- **Authentication**: JWT-based authentication with protected routes
- **Role-Based Access**: Different interfaces for Super Admin and Staff
- **Student Management**: Full CRUD operations with proper forms
- **Staff Permission Management**: Granular permission assignment for Super Admin
- **Real-time Updates**: Optimistic updates and proper error handling

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend README)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Student_Management_System_client/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ProtectedRoute.jsx
│   ├── StudentList.jsx
│   └── StudentModal.jsx
├── pages/              # Page components
│   ├── auth/
│   │   └── Login.jsx
│   ├── superAdmin/
│   │   ├── SuperadminDashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Staffs.jsx
│   │   └── StaffPermissions.jsx
│   └── staff/
│       └── StaffStudents.jsx
├── redux/              # Redux store and slices
│   ├── store.js
│   ├── authSlice.js
│   ├── user.slice.js
│   ├── studentSlice.js
│   └── staffPermissionSlice.js
├── layouts/            # Layout components
│   └── CommonDashboardLayout.jsx
└── App.jsx            # Main app component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## User Roles

### Super Admin
- **Dashboard**: Overview of system statistics
- **Staff Management**: Create, edit, delete staff accounts
- **Student Management**: Full CRUD operations on students
- **Permission Management**: Assign granular permissions to staff

### Staff
- **Student Management**: Access based on assigned permissions
- **View Students**: If permission granted
- **Create Students**: If permission granted
- **Edit Students**: If permission granted
- **Delete Students**: If permission granted

## Key Components

### ProtectedRoute
- Handles authentication and role-based access
- Redirects unauthorized users
- Supports multiple allowed roles

### StudentList
- Displays students in a table format
- Shows student details with proper formatting
- Action buttons based on user permissions
- Responsive design with Material-UI

### StudentModal
- Form for adding/editing students
- Validation for all fields
- View mode for read-only access
- Proper error handling

### StaffPermissions
- Permission management interface for Super Admin
- Checkbox-based permission assignment
- Visual representation of current permissions
- Bulk permission operations

## State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  user: {
    staffs: [],
    students: [],
    loading: false,
    error: null
  },
  student: {
    students: [],
    currentStudent: null,
    loading: false,
    error: null,
    success: false
  },
  staffPermission: {
    staffPermissions: [],
    currentPermission: null,
    loading: false,
    error: null,
    success: false
  }
}
```

## API Integration

- Uses Axios for HTTP requests
- Automatic JWT token handling
- Proper error handling and user feedback
- Loading states for better UX

## Styling

- Material-UI (MUI) components
- Consistent design system
- Responsive layout
- Dark/light theme support
- Custom styling with sx prop

## Error Handling

- Toast notifications for user feedback
- Proper error boundaries
- Loading states and spinners
- Form validation with error messages

## Security Features

- Protected routes based on authentication
- Role-based component rendering
- JWT token management
- Secure API communication

## Development Guidelines

1. **Component Structure**: Use functional components with hooks
2. **State Management**: Use Redux for global state, local state for UI
3. **Styling**: Use Material-UI components and sx prop
4. **Error Handling**: Always handle errors and show user feedback
5. **Performance**: Use React.memo and useMemo where appropriate

## Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview

# Deploy to hosting service
# Copy dist/ folder to your hosting provider
```

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check if backend server is running
   - Verify VITE_API_URL in .env file
   - Check CORS settings in backend

2. **Authentication Issues**
   - Clear browser cookies
   - Check JWT token expiration
   - Verify login credentials

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check for syntax errors
   - Verify all imports are correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
