import axios from 'axios';

let BASE_URL = 'http://localhost:8080/';
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  //   const token = await store.getToken();
  //   config.headers.token = "Bearer " + token;
  // config.headers.token =
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGFjYjllOTI3YTBhOTA1NDVjNmU5YyIsInBob25lTnVtYmVyIjoiMDk5OTk5OTk5OSIsIm5hbWUiOiJDb25nIFZhbiBIb2FuZyIsImlhdCI6MTY2NTg0NjY1NywiZXhwIjoxNjY4NDM4NjU3fQ.uHTFL3YsjiW-eIE-X_qgF2_eATqqSOvw3Mm-kNbBF1A";

  return config;
});
export default axiosClient;
