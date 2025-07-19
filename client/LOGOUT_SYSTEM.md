# Logout System Documentation

## Overview
The Student Management System implements a comprehensive logout system with multiple security features to ensure proper session management and user authentication.

## Features

### 1. **Manual Logout**
- **Location**: Sidebar (bottom section)
- **Functionality**: 
  - Confirmation dialog before logout
  - Clears both Super Admin and Staff authentication states
  - Sends logout request to backend to clear cookies
  - Redirects to login page
  - Shows success toast notification

### 2. **Automatic Session Management**
- **Token Expiry Check**: Every 5 minutes
- **Activity Tracking**: Monitors user interactions (mouse, keyboard, touch)
- **Tab Visibility**: Checks authentication when user returns to tab
- **Auto-logout**: Automatically logs out on token expiry

### 3. **Session Timeout Warning**
- **Warning Time**: 60 seconds before session expiry
- **Visual Progress**: Progress bar showing time remaining
- **Options**: 
  - Extend session (resets timer)
  - Logout immediately
- **Activity Reset**: Extending session resets activity timer

## Components

### LogoutButton
- **File**: `src/components/LogoutButton.jsx`
- **Features**:
  - Confirmation dialog
  - Full-width button in sidebar
  - Red color scheme for visibility
  - Handles both auth states

### AuthProvider
- **File**: `src/components/AuthProvider.jsx`
- **Features**:
  - Wraps entire application
  - Monitors authentication state
  - Handles automatic logout
  - Tracks user activity

### SessionTimeoutWarning
- **File**: `src/components/SessionTimeoutWarning.jsx`
- **Features**:
  - Countdown timer
  - Progress bar visualization
  - Session extension capability
  - Automatic logout on timeout

## Backend Integration

### Logout Endpoint
- **Route**: `POST /api/auth/logout`
- **Functionality**:
  - Clears JWT cookie
  - Returns success message
  - Handles errors gracefully

### Authentication Check
- **Route**: `GET /api/auth/me`
- **Functionality**:
  - Validates current token
  - Returns user information
  - Used for session validation

## Security Features

### 1. **Cookie Management**
- **HttpOnly**: Prevents XSS attacks
- **Secure**: HTTPS only in production
- **SameSite**: Strict policy
- **Automatic Clearing**: On logout and expiry

### 2. **State Management**
- **Redux Integration**: Clears both auth slices
- **Local Storage**: Tracks activity timestamps
- **Session Storage**: Not used (stateless)

### 3. **Activity Monitoring**
- **Events Tracked**: Mouse, keyboard, touch, scroll
- **Inactivity Detection**: 25-minute threshold
- **Real-time Updates**: Activity resets timers

## Usage Examples

### Manual Logout
```jsx
// User clicks logout button in sidebar
// Confirmation dialog appears
// User confirms logout
// System clears auth states and redirects
```

### Session Extension
```jsx
// Warning dialog appears at 25 minutes
// User clicks "Extend Session"
// Timer resets to 60 seconds
// Activity tracking continues
```

### Automatic Logout
```jsx
// Token expires or becomes invalid
// System automatically logs out user
// Shows "Session expired" message
// Redirects to login page
```

## Configuration

### Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

### Timeout Settings
- **Session Duration**: 30 minutes (configurable in backend)
- **Warning Time**: 60 seconds before expiry
- **Check Interval**: 5 minutes for token validation
- **Activity Threshold**: 25 minutes of inactivity

## Error Handling

### Network Errors
- Graceful fallback to manual logout
- Error logging for debugging
- User-friendly error messages

### Token Validation
- Automatic retry on network issues
- Immediate logout on validation failure
- Clear error states

## Best Practices

### 1. **User Experience**
- Clear confirmation dialogs
- Visual progress indicators
- Informative toast notifications
- Smooth transitions

### 2. **Security**
- Secure cookie settings
- Proper token validation
- Activity-based session management
- Automatic cleanup

### 3. **Performance**
- Efficient event listeners
- Minimal API calls
- Optimized state management
- Cleanup on unmount

## Troubleshooting

### Common Issues

1. **Logout not working**
   - Check network connectivity
   - Verify backend is running
   - Check browser console for errors

2. **Session expires too quickly**
   - Verify activity tracking is working
   - Check localStorage for activity timestamps
   - Ensure user interactions are being detected

3. **Warning dialog not appearing**
   - Check component mounting
   - Verify activity threshold settings
   - Check browser console for errors

### Debug Information
- Activity timestamps in localStorage
- Redux state for authentication
- Network requests in browser dev tools
- Console logs for error tracking 