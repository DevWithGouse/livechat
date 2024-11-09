import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/Services';
import { clearUserDetails } from '../redux/userDetailsSlice';  
import image from '../assets/images/live-chat.png'; // Assuming the logo image path is correct

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const handleLogout = async () => {
    try {
      // Call the logout service to perform any backend-related logout actions (e.g., invalidating tokens)
      localStorage.removeItem('token');
      await logout();
      dispatch(clearUserDetails());
      // Redirect to login after logout
      navigate('/');
    } catch (error) {
      dispatch(clearUserDetails());
      navigate('/');
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <header className="relative flex justify-between items-center p-4 bg-black text-white">
      {/* Left section: User name */}
      <div className="text-lg font-semibold">
        {userDetails.userName}
      </div>

      {/* Center section: Logo and Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
        <img src={image} alt="Logo" className="h-8 w-8 mr-2 sm:h-10 sm:w-10" />
        <h2 className="text-md sm:text-lg font-semibold">Room Chat</h2>
      </div>

      {/* Right section: Logout button */}
      <button 
        onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-sm sm:text-base transition duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
