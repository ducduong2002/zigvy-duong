import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002', 
});

api.interceptors.response.use(
  (response) => {
    // Kiểm tra xem phản hồi có chứa token không
    if (response.data.token) {
      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm token vào header Authorization cho các yêu cầu sau
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
  }
  return config;
});

export default api;
