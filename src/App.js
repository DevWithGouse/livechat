import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChatRoom from './components/ChatRoom';
import VerifyEmail from './components/VerifyEmail';
import LandingPage from './components/LandingPage';
import './index.css';

const isLoggedIn = () => {
  return !!localStorage.getItem('token'); // Example check for authentication
};

// ProtectedRoute for restricting access based on authentication
const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

// RestrictedRoute for restricting access to non-logged-in users
const RestrictedRoute = ({ children }) => {
  return !isLoggedIn() ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Routes accessible only to non-logged-in users */}
          <Route path="/" element={<RestrictedRoute><Home /></RestrictedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerEmail" element={<RestrictedRoute><Register /></RestrictedRoute>} />
          <Route path="/verifyEmail" element={<RestrictedRoute><VerifyEmail /></RestrictedRoute>} />
          <Route path="/landingPage" element={<RestrictedRoute><LandingPage /></RestrictedRoute>} />

          {/* Protected routes for logged-in users */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/chatRoom/:roomNumber" 
            element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
