import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Port 5001 (5000 is taken by macOS AirPlay Receiver / ControlCenter).
// localhost works on the iOS Simulator. For a real device or Android emulator,
// replace localhost with your computer's LAN IP (e.g. http://192.168.1.5:5001),
// or 10.0.2.2 for the Android emulator.
const BASE_URL = 'http://localhost:5001/api';

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
  me: () => api.get('/auth/me'),
};

export default api;
