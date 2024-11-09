import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkEmailEligibility, registerEmail } from '../services/Services';
import Footer from './Home/Footer'
import Header from './Home/Header'

const Register = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Helper function for email validation
  const isValidEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  // Function to check if the email exists in the database
  const checkEmailExists = async (email) => {
    setLoading(true);
    try {
      const response = await checkEmailEligibility(email);
      if (response.data.exists) {
        setEmailExists(true);
        setErrors({ email: 'This email already exists. Please log in.' });
      } else {
        setEmailExists(false);
        setErrors({});
      }
    } catch (error) {
      console.error('Error checking email eligibility:', error);
      setErrors({ email: 'Error checking email. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce for email validation
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!isValidEmail(value)) {
      setErrors({ email: 'Invalid email format. Please enter a valid email.' });
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    setDebounceTimer(
      setTimeout(() => {
        if (value) checkEmailExists(value);
      }, 1000) // Debounce delay of 1000ms
    );
  };

  // Handle email verification request
  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await registerEmail(email);
      if (response.status === 200) {
        setVerificationSent(true);
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setErrors({ email: 'Failed to send verification email. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm bg-gray-800 p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>

        {!verificationSent ? (
          <>
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={loading}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Verify Button */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handleVerify}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${
                    emailExists || !email || loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={emailExists || !email || loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>

              {/* Inline message for existing user */}
              {emailExists && (
                <p className="mt-4 text-gray-400 text-center">
                  If you are an existing user, please{' '}
                  <Link to="/login" className="text-blue-400 hover:underline">
                    login here
                  </Link>.
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-green-500">
            A verification link has been sent to your email. Please check your inbox to verify your account.
          </p>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Register;
