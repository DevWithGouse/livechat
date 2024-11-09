import { useState, useEffect } from 'react';
import { refreshToken, removeToken } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { trackUserActivity } from '../util/activityTracker';
import { logout } from '../services/Services';
import { useDispatch } from 'react-redux';
import { clearUserDetails } from '../redux/userDetailsSlice'; 

export const useAuth = () => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const TOKEN_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes
  let refreshInterval;

  useEffect(() => {
    const startTokenRefresh = () => {
      refreshInterval = setInterval(async () => {
        try {
          await refreshToken();
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Token refresh failed:', error);
          setSessionExpired(true);
        }
      }, TOKEN_EXPIRATION_TIME);
    };

    // Start refreshing token initially
    startTokenRefresh();

    const stopTracking = trackUserActivity(() => {
      // If the user is active, reset the token expiration timer
      clearInterval(refreshInterval);
      startTokenRefresh(); // Restart the token refresh interval
      console.log('User active: refresh interval reset');
    });

    return () => {
      clearInterval(refreshInterval);
      stopTracking(); // Stop tracking when component unmounts
    };
  }, []); // Empty array means this effect runs once when the component mounts

  useEffect(() => {
    const handleSessionExpiration = async () => {
      if (sessionExpired) {
        removeToken(); // Remove the expired token
        await logout(); // Call the logout service to clear backend session
        dispatch(clearUserDetails()); // Clear user details from redux
        console.log('Session expired: user logged out');
        navigate('/'); // Redirect to the home page
      }
    };

    handleSessionExpiration();
  }, [sessionExpired, navigate, dispatch]);

  return sessionExpired;
};
