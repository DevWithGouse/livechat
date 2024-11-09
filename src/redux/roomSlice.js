// roomSlice.js
import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'roomData',
  initialState: {
    rooms: [],
    maxRooms: 2,
  },
  reducers: {
    addRooms:(state, action) => {
      state.rooms = [...action.payload];
    },
    addRoom: (state, action) => {
      if (state.rooms.length < state.maxRooms) {
        state.rooms.push(action.payload);
      }
    },
    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter(room => room.roomNumber !== action.payload);
    },
  },
});

export const { addRoom, removeRoom,addRooms } = roomSlice.actions;
export default roomSlice.reducer;
