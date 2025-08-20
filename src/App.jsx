import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';

// A wrapper to protect routes that require authentication
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* All dashboard routes are now standalone */}
        <Route path="/teacher" element={ <ProtectedRoute> <TeacherDashboard /> </ProtectedRoute> } />
        <Route path="/student" element={ <ProtectedRoute> <StudentDashboard /> </ProtectedRoute> } />
        <Route path="/parent" element={ <ProtectedRoute> <ParentDashboard /> </ProtectedRoute> } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}