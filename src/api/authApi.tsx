import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';

class AuthApi {
  async login(username: string, password: string): Promise<AxiosResponse> {
    const url = 'auth/login';

    return axiosClient.post(url, {
      username,
      password,
    });
  }
}

const authApi = new AuthApi();
export default authApi;
