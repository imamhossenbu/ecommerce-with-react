import axios from 'axios';


const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); 
  window.location.href = '/signin'; 
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.yourdomain.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.warn('Session expired or Unauthorized. Logging out...');
      handleLogout(); 
    }

    return Promise.reject(error);
  }
);

export { handleLogout }; 
export default axiosInstance;