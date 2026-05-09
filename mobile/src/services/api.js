import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.square1mmh.com/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
