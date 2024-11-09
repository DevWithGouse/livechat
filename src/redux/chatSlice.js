import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chatRoom',
  initialState: {
    joinedRoom: {}
  },
  reducers: {
    addChatRoom: (state, action) => {
        state.joinedRoom= action.payload
    },
    removeChatRoom: (state, action) => {
        return { ...state, joinedRoom: {} }; // Return a new state object with an empty array
    },
  },
});

export const { addChatRoom, removeChatRoom } = chatSlice.actions;
export default chatSlice.reducer;