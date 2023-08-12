import { Socket } from 'socket.io-client';
import { create } from 'zustand';

type GlobalStateType = {
  isFullLoading: boolean;
  socket: Socket | null;
};

type GlobalActionType = {
  setFullLoading: (is: boolean) => void;
  setSocket: (socket: Socket | null) => void;
};

const useGlobalStore = create<GlobalStateType & GlobalActionType>((set) => ({
  isFullLoading: true,
  socket: null,

  setFullLoading: (loading) => {
    set({
      isFullLoading: loading,
    });
  },
  setSocket: (socket) => {
    set({
      socket,
    });
  },
}));

export default useGlobalStore;
