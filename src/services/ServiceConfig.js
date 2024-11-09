// servicesConfig.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:5000/api', // Base URL from the env file
  timeout: 10000, // 10 seconds timeout
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - only add token for specific routes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Fetch token from localStorage
    
    // Check if the URL requires authentication
    const authRoutes = ['rooms/createRoom', 'rooms/join','rooms/getAvailableRooms', 'rooms/deleteRoom', 'auth/logout'];
    const requiresAuth = authRoutes.some(route => config.url.includes(route));

    if (token && requiresAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('No response received', error.request);
    } else {
      console.error('Request setup error', error.message);
    }
    return Promise.reject(error.response || error.message);
  }
);

export default apiClient;
