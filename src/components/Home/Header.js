import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa'; // Importing icons
import image from '../../assets/images/live-chat.png';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine the current route
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/registerEmail' || location.pathname === '/verifyEmail';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <img src={image} alt="Logo" className="h-12 w-12" />
          <div className="text-2xl font-bold">
            <Link to="/">Room Chat</Link>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-white ml-auto"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Right: Navigation Icons for Desktop */}
        <nav className={`hidden lg:flex items-center space-x-4`}>
          {/* Home Icon and Text */}
          {!isHomePage && (
            <Link
              to="/"
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <FaHome className="text-white" />
              <span>Home</span>
            </Link>
          )}

          {/* Login Icon and Text */}
          {!isLoginPage && (
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <FaSignInAlt className="text-white" />
              <span>Login</span>
            </Link>
          )}

          {/* Register Icon and Text */}
          {!isRegisterPage && (
            <Link
              to="/registerEmail"
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <FaUserPlus className="text-white" />
              <span>Register</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      <nav className={`lg:hidden fixed top-0 right-0 w-64 bg-black text-white px-4 py-2 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Home Icon and Text */}
        {!isHomePage && (
          <Link
            to="/"
            className="flex items-center space-x-2 py-2"
            onClick={toggleMobileMenu}
          >
            <FaHome className="text-white" />
            <span>Home</span>
          </Link>
        )}

        {/* Login Icon and Text */}
        {!isLoginPage && (
          <Link
            to="/login"
            className="flex items-center space-x-2 py-2"
            onClick={toggleMobileMenu}
          >
            <FaSignInAlt className="text-white" />
            <span>Login</span>
          </Link>
        )}

        {/* Register Icon and Text */}
        {!isRegisterPage && (
          <Link
            to="/registerEmail"
            className="flex items-center space-x-2 py-2"
            onClick={toggleMobileMenu}
          >
            <FaUserPlus className="text-white" />
            <span>Register</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
