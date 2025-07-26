// utils/axiosWithToken.js أو axiosClient.js
import axios from 'axios';

const axiosWithToken = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // ⬅️ ضروري علشان الكوكي يروح مع كل طلب
});

export default axiosWithToken;
