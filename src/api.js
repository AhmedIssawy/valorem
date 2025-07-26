import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // هذا يضمن إرسال الكوكي
});

// لا حاجة لإضافة Authorization header الآن لأن التوكن في الكوكي
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// التعامل مع الأخطاء
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
