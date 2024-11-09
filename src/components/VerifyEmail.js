import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerUser, verifyEmail, checkUserNameEligibility } from '../services/Services';
import Footer from './Home/Footer'
import Header from './Home/Header'

const VerifyEmail = () => {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    verifyToken(token);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [location, debounceTimer]);

  const verifyToken = async (token) => {
    try {
      const response = await verifyEmail(token);
      const data = response.data;
      if (data.error) {
        setStatus('error');
        setErrors({ verify: data.message });
      } else if (data.isUserNameUpdated) {
        setStatus('UserNameUpdated');
        setEmail(data.email);
      } else if (!data.isUserNameUpdated) {
        setStatus('UserNameNotUpdated');
        setEmail(data.email);
      } else {
        setStatus('valid');
        setEmail(data.email);
      }
    } catch (error) {
      setStatus('error');
      setErrors({ verify: 'Invalid token or token expired. Please register again' });
    }
  };

  const checkUsernameExists = async (username) => {
    setLoading(true);
    try {
      const response = await checkUserNameEligibility(username);
      if (response.data.exists) {
        setUsernameExists(true);
        handleError('username', 'Username already exists');
      } else {
        setUsernameExists(false);
        handleError('username', null);
      }
    } catch (error) {
      handleError('username', 'Error checking username. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);

    const isValidUsername = /^[a-zA-Z][a-zA-Z0-9]*$/.test(value);
    if (!isValidUsername) {
      handleError('username', 'Invalid username format');
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        if (value) checkUsernameExists(value);
      }, 1000)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      try {
        const request = {
          email,
          username,
          password: btoa(password.trim())
        };
        const response = await registerUser(request);
        if (response.data.success) {
          navigate('/login');
        } else {
          handleError('register', response.data.message);
        }
      } catch (error) {
        handleError('register', 'Failed to register. Please try again.');
      }
    }
  };

  const validate = () => {
    const validationErrors = {};
    if (!username) validationErrors.username = 'Username is required';
    if (!password) validationErrors.password = 'Password is required';
    if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
    return validationErrors;
  };

  return (
    <>
    <Header />
    <div className="flex items-center justify-center min-h-screen bg-black">
      {status === 'UserNameUpdated' && (
        <div className="flex flex-col items-center justify-center max-w-md mx-auto p-4 bg-gray-800 rounded shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Email Verification</h2>
          <div className="text-center">
            <p className="text-green-500 bg-green-900 p-4 rounded mb-4">This email is already verified. Please log in.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center justify-center max-w-md mx-auto p-4 bg-gray-800 rounded shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Email Verification</h2>
          <div className="text-center">
            <p className="text-red-500 bg-red-900 p-4 rounded mb-4">{errors.verify || 'Error verifying token'}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate('/registerEmail')}
            >
              Register
            </button>
          </div>
        </div>
      )}

      {(status === 'valid' || status === 'UserNameNotUpdated') && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-800 rounded shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Complete Registration</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              disabled
              className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-600 text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChangeUsername}
              className={`mt-1 block w-full p-2 border ${
                errors.username ? 'border-red-500' : 'border-gray-700'
              } rounded-md bg-gray-600 text-white`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            {usernameExists && <p className="text-red-500 text-sm">Username already exists</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full p-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-700'
              } rounded-md bg-gray-600 text-white`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full p-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
              } rounded-md bg-gray-600 text-white`}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 ${
              loading || usernameExists ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading || usernameExists}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {errors.register && <p className="text-red-500 text-sm mt-2">{errors.register}</p>}
        </form>
      )}
    </div>
    <Footer />
    </>
  );
};

export default VerifyEmail;
