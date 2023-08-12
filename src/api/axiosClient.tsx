import { browserStore } from '@/utils';
import axios from 'axios';

export const BASE_URL = 'http://localhost:5000/';

const axiosClient = axios.create({
  baseURL: BASE_URL + 'api/',
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = browserStore.getToken();
  config.headers.authorization = 'Bear ' + token;

  return config;
});
export default axiosClient;
