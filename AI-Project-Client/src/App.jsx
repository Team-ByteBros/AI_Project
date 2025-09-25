import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/Navbar/Navbar';
import EnergyDashboard from './components/EnergyDashboard/EnergyDashboard';
import Profile from './components/Profile/Profile';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

function CenteredScreen({ children }) {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#f5fef6',
        position: 'relative'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          width: '100vw',
          position: 'absolute',
          top: '64px',
          left: 0,
          padding: '1rem',
          background: '#f5fef6', // Ensure consistent background
          overflow: 'auto', // Allow scrolling if needed
        }}
      >
        {children}
      </div>
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/signin"
            element={
              <CenteredScreen>
                <SignIn />
              </CenteredScreen>
            }
          />
          <Route
            path="/signup"
            element={
              <CenteredScreen>
                <SignUp />
              </CenteredScreen>
            }
          />
          <Route path="/dashboard" element={<EnergyDashboard />} />
          <Route
            path="/profile"
            element={
              <CenteredScreen>
                <Profile />
              </CenteredScreen>
            }
          />  {/* Wrap Profile in CenteredScreen */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
