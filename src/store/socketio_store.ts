import { DrawnObjectType } from '@/types/types';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';
export const moreProperties = [
  'id',
  'isLocked',
  'frameId',
  'isFrameLabel',
  'frameLabel',
  'fromEmit',
];

type StateType = {
  socket: Socket | null;
};
type ActionType = {
  addOneDrawnObj: (newObj: DrawnObjectType) => void;
  setSocket: (socket: Socket | null) => void;
};

const useSocketIoStore = create<StateType & ActionType>((set, get) => ({
  socket: null,

  addOneDrawnObj: (newObj) => {
    const { socket } = get();
    if (!socket) return;

    let value = newObj.toDatalessObject(moreProperties);
    value.fromEmit = true;
    socket.emit('drawn_obj:add', {
      value,
    });
  },
  setSocket: (socket) => {
    set({
      socket,
    });
  },
}));

export default useSocketIoStore;
