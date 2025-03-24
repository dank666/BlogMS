import axios from 'axios';

// 创建 Axios 实例
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // 后端 API 根路径
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器：自动添加 Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：处理 Token 过期
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refresh_token = localStorage.getItem('refresh_token');
      if (refresh_token) {
        try {
          // 用 refresh_token 获取新的 access_token
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refresh_token
          });

          // 更新 token
          localStorage.setItem('token', response.data.access);
          error.config.headers.Authorization = `Bearer ${response.data.access}`;

          // 重新发送失败的请求
          return api(error.config);
        } catch (refreshError) {
          // 刷新失败，跳转登录页
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);


// API 方法封装
export const getPosts = async () => api.get('/posts/');
export const createPost = async (postData) => api.post('/posts/', postData);
export const login = async (username, password) => api.post('/token/', { username, password });

export default api;

