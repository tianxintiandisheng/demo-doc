import axios from 'axios';

// 配置默认选项
const instance = axios.create({
  baseURL: 'https://apifoxmock.com/m1/5409223-5083126-default', // 你的 API 地址
  timeout: 10000, // 超时时间
  headers: {
    'Content-Type': 'application/json',
    apifoxToken: 'd3cFEev7yDWbZz9KEwtVB',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token') // 如果需要鉴权，可以在这里添加 token
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Error:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else {
      // 发生了一些问题，导致请求未发出
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

// GET 请求
export const get = (url, params?: any) => instance.get(url, { params });

// POST 请求
export const post = (url, data) => instance.post(url, data);

// PUT 请求
export const put = (url, data) => instance.put(url, data);

// DELETE 请求
export const del = (url, data) => instance.delete(url, { data });
