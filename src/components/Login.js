import { useState } from 'react';
import { login } from '../services/Services';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/userDetailsSlice';
import Footer from './Home/Footer'
import Header from './Home/Header'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const validationErrors = {};
    if (!form.email) validationErrors.email = 'Email is required';
    if (!form.password) validationErrors.password = 'Password is required';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);  // Set errors if validation fails
    } else {
      try {
        const request = {
          email: form.email,
          password: btoa(form.password.trim()), // base64 encoding for example purposes
        };

        const response = await login(request);
        
        if (response.data.token) {
          // Save token to local storage
          localStorage.setItem('token', response.data.token);
          
          // Dispatch user details to Redux
          dispatch(setUserDetails({
            email: response.data.email,
            token: response.data.token,
            userName: response.data.username,
            userId: response.data.userId,
          }));
          
          // Redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        // Handle server-side errors
        if (error.response && error.response.status === 401) {
          setErrors({ password: 'Invalid email or password' });
        } else if (error.response && error.response.status === 500) {
          setErrors({ general: 'An unexpected error occurred. Please try again later.' });
        } else {
          setErrors({ general: 'An error occurred. Please try again later.' });
        }
      }
    }
  };

  return (
    <>
    <Header />
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm bg-gray-800 p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-gray-100 ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-gray-100 ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center mt-2">{errors.general}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Registration Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            New user?{' '}
            <Link to="/registerEmail" className="text-blue-500 hover:underline">
              Click here to register
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
