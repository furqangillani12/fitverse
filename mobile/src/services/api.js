import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For a real device with Expo Go, replace localhost with your computer's LAN IP
// (e.g. http://192.168.1.5:5000). localhost only works in a simulator.
const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if available
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
};

export default api;
