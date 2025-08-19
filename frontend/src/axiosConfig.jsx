
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://16.176.9.48:5001/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // avoid infinite loops: only clear and redirect if we had a token
      const hadToken = !!localStorage.getItem('token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (hadToken) window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default instance;

