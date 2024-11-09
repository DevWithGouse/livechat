import React from 'react';

const SessionExpiredPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-xs w-full sm:max-w-sm md:max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Session Expired</h2>
        <p className="mb-6 text-center">Your session has expired. Please log in again.</p>
        <div className="flex justify-center">
          <button 
            onClick={onClose} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredPopup;
