import { CanvasObjectType } from '@/types/types';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';
export const moreProperties = [
  'id',
  'isLocked',
  'frameId',
  'isFrameLabel',
  'frameLabel',
  'fromEmit',
  'ct_hightLightPen',
];

type StateType = {
  socket: Socket | null;
};
type ActionType = {
  setSocket: (socket: Socket | null) => void;
};

const useSocketIoStore = create<StateType & ActionType>((set, get) => ({
  socket: null,

  setSocket: (socket) => {
    set({
      socket,
    });
  },
}));

export default useSocketIoStore;
