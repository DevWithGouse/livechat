import apiClient from './ServiceConfig';

// Service to register an email
export const registerEmail = (email) => {
  return apiClient.post('auth/registerEmail', { email });
};

// Service to verify the email
export const verifyEmail = (token) => {
  return apiClient.get(`auth/verifyEmail?token=${token}`);
};

// Service to handle login (does not require token)
export const login = (request) => {
  return apiClient.post('auth/login', { request }, { withCredentials: true });
};

// Service to create a room (requires token)
export const createRoom = (roomName) => {
  return apiClient.post('rooms/createRoom', roomName);
};
// Service to create a room (requires token)
export const deleteRoom = (roomNumber) => {
  return apiClient.delete(`rooms/deleteRoom/${roomNumber}`);
};

// Service to join a room by room ID (requires token)
export const joinRoom = (roomNumber) => {
  return apiClient.get(`rooms/join/${roomNumber}`);
};

export const getAvailableRooms = () => {
  return apiClient.get(`rooms/getAvailableRooms`);
};

// Service to logout (requires token)
export const logout = () => {
  return apiClient.post('auth/logout', {}, { withCredentials: true });
};

// Service to check email eligibility (whether the email already exists)
export const checkEmailEligibility = (email) => {
  return apiClient.post('auth/checkEmailEligibility', { email });
};

// Service to check username eligibility (whether the username already exists)
export const checkUserNameEligibility = (username) => {
  return apiClient.post('auth/checkUserNameEligibility', { username });
};
// Service to check username eligibility (whether the username already exists)
export const registerUser = (request) => {
  return apiClient.post('auth/registerUser', { request });
};
