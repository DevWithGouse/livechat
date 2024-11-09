import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Left: Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">Live Room Chat</Link>
          </div>

          {/* Center: Navigation */}
          <nav className="space-x-6 text-lg hidden md:flex">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/rooms" className="hover:text-gray-400">Rooms</Link>
            <Link to="/rules" className="hover:text-gray-400">Rules</Link>
            <Link to="/about" className="hover:text-gray-400">About</Link>
          </nav>

          {/* Right: User Actions */}
          <div className="flex items-center space-x-4">
            {userDetails.userName ? (
              <>
                <button className="hover:text-gray-400">🔔</button>
                <button className="hover:text-gray-400">
                  👤 {userDetails.userName}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Promotional Section */}
      <main className="flex items-center justify-center min-h-screen text-center relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/path/to/your/moon-background.png" // Replace with your moon animation background image path
            alt="Moon Background"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Promotional Content */}
        <div className="z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Life is Too Short <br /> to Be Bored
          </h1>
          <Link
            to="/rooms"
            className="text-xl text-white bg-blue-500 hover:bg-blue-600 py-3 px-8 rounded-full"
          >
            +Join Group
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
