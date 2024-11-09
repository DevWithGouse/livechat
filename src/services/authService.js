import apiClient from './ServiceConfig';

const TOKEN_KEY = 'token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const refreshToken = async () => {
  try {
    const response = await apiClient.post('auth/refresh', { token: getToken() });
    console.log('User Active; refresh call')
    setToken(response.data.token);
  } catch (error) {
    removeToken();
    throw error;
  }
};