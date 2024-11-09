// userDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
  userName: '',
  userId: ''
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
    },
    clearUserDetails(state) {
      state.email = '';
      state.token = '';
      state.userName = '';
      state.userId =''
    },
  },
});

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;