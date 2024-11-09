import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { addRooms, removeRoom, addRoom } from '../redux/roomSlice';
import { addChatRoom, removeChatRoom } from '../redux/chatSlice';
import { getAvailableRooms, createRoom, joinRoom, deleteRoom } from '../services/Services'; 
import { useNavigate } from 'react-router-dom'; 
import Header from './Header';
import { useAuth } from '../hooks/useAuth';
import SessionExpiredPopup from '../components/SessionExpiredPopup';
import Footer from './Home/Footer'

const Dashboard = () => {
  const [roomName, setRoomName] = useState('');
  const [manualRoomNumber, setManualRoomNumber] = useState(''); 
  const dispatch = useDispatch();
  const roomData = useSelector((state) => state.roomData);
  const userDetails = useSelector((state) => state.userDetails);
  const [error, setError] = useState('');
  const [successJoin, setSuccessJoin] = useState('');
  const [successDelete, setSuccessDelete] = useState('');
  const [successCreate, setSuccessCreate] = useState('');
  const navigate = useNavigate(); 
  const sessionExpired = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (sessionExpired) {
      setShowPopup(true);
    }
  }, [sessionExpired]);

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      const getRooms = async () => {
        try {
          const response = await getAvailableRooms(userDetails.userId);
          const availableRoomsData = response.data;
          dispatch(addRooms(availableRoomsData.rooms));
        } catch (error) {
          console.error(error);
          setError('Failed to load available rooms.');
        }
      };
      getRooms();
    }
  }, [dispatch, userDetails]);

  const handleCreateRoom = async () => {
    if (!roomName) {
      setError('Room name should not be empty');
      return;
    }

    try {
      const response = await createRoom({ roomName });
      setSuccessCreate(`Room created successfully! Room Number: ${response.data.roomNumber}`);
      dispatch(addRoom(response.data));
      setError('');
    } catch (error) {
      setError('Failed to create room.');
      setSuccessCreate('');
    }
  };

  const handleRemoveRoom = async (roomNumber) => {
    try {
      dispatch(removeRoom(roomNumber));
      const response = await deleteRoom(roomNumber);
      setSuccessDelete('Room removed successfully!');
      setError('');
    } catch (error) {
      console.error('Error removing room:', error);
      setError('Failed to remove room.');
      setSuccessDelete('');
    }
  };

  const handleJoinRoom = async (roomNumber) => {
    try {
      const response = await joinRoom(roomNumber);
      if (response.data.roomName) {
        dispatch(addChatRoom(response.data));
        setSuccessJoin(`Joined room successfully!`);
        setError('');
        navigate(`/chatRoom/${roomNumber}`);
      } else {
        dispatch(removeChatRoom(''));
        setError('Room is not available.');
        setSuccessJoin('');
      }
    } catch (error) {
      dispatch(removeChatRoom(''));
      console.error('Error joining room:', error);
      setError('Failed to join room.');
      setSuccessJoin('');
    }
  };

  const handleJoinOtherRoom = async () => {
    if (!manualRoomNumber.match(/^\d+$/)) {
      setError('Please enter a valid room number.');
      return;
    }

    try {
      const response = await joinRoom(manualRoomNumber);
      if (response.data.roomName) {
        dispatch(addChatRoom(response.data));
        setSuccessJoin(`Joined room successfully!`);
        setError('');
        navigate(`/chatRoom/${manualRoomNumber}`);
      } else {
        dispatch(removeChatRoom(''));
        setError('Room is not available.');
        setSuccessJoin('');
      }
    } catch (error) {
      dispatch(removeChatRoom(''));
      console.error('Error joining room:', error);
      setError('Failed to join room.');
      setSuccessJoin('');
    }
  };

  const handleClosePopUp = () => {
    setShowPopup(false);
    navigate('/');
  };

  return (
    <>
      <Header />
      {showPopup && <SessionExpiredPopup onClose={handleClosePopUp} />}
      <div className="flex flex-col items-center bg-gray-900 text-gray-200 min-h-screen">
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold">Welcome to the Room Chat</h1>
          <p className="text-lg mt-2">Join your chat rooms or create a new chat room.</p>
        </div>

        {/* Show join section only if the user has rooms, otherwise show the create room section */}
        {roomData.rooms.length > 0 ? (
          <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-xl mb-6">
            <h2 className="text-2xl font-semibold mb-4">Join Chat Rooms</h2>
            <ul>
              {roomData.rooms.map((room) => (
                <li key={room.roomNumber} className="mb-4 border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Room Number: {room.roomNumber}</p>
                      <p className="text-sm">Room Name: {room.roomName}</p>
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                        onClick={() => handleJoinRoom(room.roomNumber)}
                      >
                        Join
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        onClick={() => handleRemoveRoom(room.roomNumber)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successJoin && <p className="text-green-500 mt-4">{successJoin}</p>}
            {successDelete && <p className="text-green-500 mt-4">{successDelete}</p>}
          </div>
        ) : (
          <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-xl mb-6">
            <h2 className="text-2xl font-semibold mb-4">Create New Chat Room</h2>
            <input
              type="text"
              placeholder="Enter Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="border rounded w-full py-2 px-3 mb-4 bg-gray-700 text-white"
            />
            <button
              onClick={handleCreateRoom}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Create Room
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successCreate && <p className="text-green-500 mt-4">{successCreate}</p>}
          </div>
        )}

        {/* Join Others' Rooms */}
        <div className="flex items-center my-6 w-full max-w-xl">
          <hr className="flex-grow border-t border-gray-700" />
          <span className="mx-4 text-gray-500 font-semibold">OR</span>
          <hr className="flex-grow border-t border-gray-700" />
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">Join Others' Rooms</h2>
          <input
            type="text"
            placeholder="Enter Room Number"
            value={manualRoomNumber}
            onChange={(e) => setManualRoomNumber(e.target.value)}
            className="border rounded w-full py-2 px-3 mb-4 bg-gray-700 text-white"
            pattern="[0-9]*"
          />
          <button
            onClick={handleJoinOtherRoom}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Join Room
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successJoin && <p className="text-green-500 mt-4">{successJoin}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
