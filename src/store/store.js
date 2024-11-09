import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../redux/roomSlice';
import userDetailsSlice from '../redux/userDetailsSlice';
import chatSlice from '../redux/chatSlice'

const store = configureStore({
  reducer: {
    roomData: roomReducer,
    userDetails: userDetailsSlice,
    joinedRoom: chatSlice
  },
});

export default store;