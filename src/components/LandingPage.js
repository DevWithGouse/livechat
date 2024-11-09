import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Home/Header';
import Footer from './Home/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Header />
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-10">Welcome to Room Chat</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12 md:w-8/12 lg:w-6/12">
        {/* Login Card */}
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Existing User?</h2>
          <p className="text-gray-400 mb-6">If you are an existing user, click here to login.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
        </div>

        {/* Register Card */}
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/registerEmail')}
        >
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">New User?</h2>
          <p className="text-gray-400 mb-6">If you are a new user, please register here.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Register
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default LandingPage;
