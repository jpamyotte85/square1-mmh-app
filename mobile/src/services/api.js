import axios from 'axios';
import auth from '@react-native-firebase/auth';

const api = axios.create({
  baseURL: 'https://your-api-url.railway.app/api',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const user = auth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
