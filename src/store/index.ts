import { Socket } from 'socket.io-client';
import { create } from 'zustand';

export enum eToastType {
  fetching,
  success,
  error,
}

type GlobalStateType = {
  isFullLoading: boolean;
  bottomToast: {
    title: string;
    timeout: number;
    type: eToastType;
  };
};

type GlobalActionType = {
  setFullLoading: (is: boolean) => void;
  setBotoomToast: (title?: string, timeout?: number, type?: eToastType) => void;
};

const useGlobalStore = create<GlobalStateType & GlobalActionType>((set) => ({
  isFullLoading: true,
  bottomToast: {
    title: '',
    timeout: 0,
    type: eToastType.fetching,
  },

  setFullLoading: (loading) => {
    set({
      isFullLoading: loading,
    });
  },
  setBotoomToast: (title = '', timeout = 0, type = eToastType.fetching) => {
    set({
      bottomToast: { title, timeout, type },
    });
  },
}));

export default useGlobalStore;
