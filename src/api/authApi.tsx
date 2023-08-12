import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';
import { IUser } from '@/store/auth_store';
import { ResponseTypeCustom } from '@/utils/types';

class AuthApi {
  async login(
    email: string,
    password: string,
  ): Promise<
    AxiosResponse<ResponseTypeCustom & { user: IUser; token: string }>
  > {
    const url = 'auth/login';

    return axiosClient.post(url, {
      email,
      password,
    });
  }

  async loginByToken(): Promise<
    AxiosResponse<ResponseType & { user: IUser; token: string }>
  > {
    const url = 'auth/loginByToken';
    return axiosClient.get(url);
  }
}

const authApi = new AuthApi();
export default authApi;
