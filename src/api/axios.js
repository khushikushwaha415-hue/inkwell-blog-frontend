import axios from 'axios';

const API = axios.create({ 
  baseURL: 'https://inkwell-blog-backend.onrender.com/api'
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('inkwell_user'));
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

export default API;