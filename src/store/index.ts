import { Socket } from 'socket.io-client';
import { create } from 'zustand';

type GlobalStateType = {
  isFullLoading: boolean;
};

type GlobalActionType = {
  setFullLoading: (is: boolean) => void;
};

const useGlobalStore = create<GlobalStateType & GlobalActionType>((set) => ({
  isFullLoading: true,

  setFullLoading: (loading) => {
    set({
      isFullLoading: loading,
    });
  },
}));

export default useGlobalStore;
