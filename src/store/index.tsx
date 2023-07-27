import authApi from '@/api/authApi';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

interface User {
  id: number;
  name: string;
}

type AuthStateType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  logInByToken: () => void;
  logOut: () => void;
  logInSuccess: (user: User) => void;
};

const useAuthStore = create<AuthStateType>((set) => ({
  user: null,
  isLoggedIn: true,
  isLoading: true,
  logInSuccess: (user) => {
    set({
      user,
      isLoggedIn: true,
    });
  },
  logInByToken: () => {},
  logOut: () => {},
}));

export default useAuthStore;
