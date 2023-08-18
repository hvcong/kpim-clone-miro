import authApi from '@/api/authApi';
import { IUser } from '@/types/types';
import { browserStore } from '@/utils';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

type AuthStateType = {
  user: IUser | null;
  isLoggedIn: boolean;

  logOut: () => void;
  logInSuccess: (user: IUser, token: string) => void;
};

const useAuthStore = create<AuthStateType>((set) => ({
  user: null,
  isLoggedIn: false,
  logInSuccess: (user, token) => {
    browserStore.addToken(token);
    set({
      user,
      isLoggedIn: true,
    });
  },
  logOut: () => {
    set({
      isLoggedIn: false,
      user: null,
    });
    browserStore.removeToken();
  },
}));

export default useAuthStore;
