import { EnumType } from 'typescript';
import { create } from 'zustand';
import { fabric } from 'fabric';
import { Member, MousePointer, Paper } from '@/types/types';
import useSocketIoStore from './socketio_store';

type RightSideBarType = 'comment' | 'message' | string;
type LeftSideBarType = 'frame' | 'history' | string;

type PaperStateType = {
  paper: Paper | null;
  memberOnlineList: Member[];
  //server state
  isSaving: boolean;
  isSaved: boolean;

  // canvas data state
  scale: number;
  canvas: fabric.Canvas | null;

  pointScale: {
    x: number;
    y: number;
  };

  // paper page state

  showStyleBar: boolean;
  rightSideBarType: RightSideBarType;
  leftSideBarType: LeftSideBarType;
  showCursorPartner: boolean;
  showPaperDetailModal: boolean;

  setShowStyleBar: (show: boolean) => void;
  setScale: (scale: number, x: number, y: number) => void;
  setCanvas: (canvas: fabric.Canvas | null) => void;
  setRightSideBarType: (type: RightSideBarType) => void;
  setLeftSideBarType: (type: LeftSideBarType) => void;
  setShowCursorPartner: (show: boolean) => void;
  setShowPaperDetailModal: (show: boolean) => void;
  setPaper: (paper: Paper | null) => void;
  resetPaperState: () => void;
  emit_updatePaperName: (name: string) => void;

  emit_memberMouseMoving: (pointer: MousePointer) => void;

  on_updatePaperName: (name: string) => void;
  on_setListMemberOnline: (list: Member[]) => void;
  on_addOneMemberOnline: (member: Member) => void;
  on_removeOneMemberOnline: (userId: string) => void;
};

const initPaperState = {
  paper: null,
  memberOnlineList: [],
  //
  isSaving: false,
  isSaved: true,
  //

  scale: 1,
  canvas: null,
  pointScale: {
    x: 0,
    y: 0,
  },
  showStyleBar: false,
  rightSideBarType: '',
  leftSideBarType: '',
  showCursorPartner: false,
  showPaperDetailModal: false,
};

const usePaperStore = create<PaperStateType>((set, get) => ({
  ...initPaperState,
  //

  //
  setShowStyleBar: (show) => {
    set({
      showStyleBar: show,
    });
  },
  setScale: (scale, x, y) => {
    set({ scale: scale, pointScale: { x, y } });
  },
  setCanvas: (canvas: fabric.Canvas | null) => {
    set({
      canvas,
    });
  },
  setRightSideBarType: (type) => {
    set({
      rightSideBarType: type,
    });
  },

  setLeftSideBarType: (type) => {
    set({
      leftSideBarType: type,
    });
  },

  setShowCursorPartner: (show) => {
    set({
      showCursorPartner: show,
    });
  },
  setShowPaperDetailModal: (show) => {
    set({
      showPaperDetailModal: show,
    });
  },
  setPaper: (paper) => {
    set({
      paper,
    });
  },
  resetPaperState: () => {
    set({
      ...initPaperState,
    });
  },

  //on
  on_updatePaperName(name) {
    set(({ paper }) => {
      if (paper) {
        return {
          paper: {
            ...paper,
            name,
          },
        };
      } else {
        return {
          paper: null,
        };
      }
    });
  },

  on_setListMemberOnline: async (list: Member[]) => {
    set(({ memberOnlineList }) => ({
      memberOnlineList: list,
    }));
  },
  on_addOneMemberOnline: (member) => {
    set(({ memberOnlineList }) => ({
      memberOnlineList: [...memberOnlineList, member],
    }));
  },
  on_removeOneMemberOnline: (userId: string) => {
    set(({ memberOnlineList }) => {
      console.log(memberOnlineList);
      return {
        memberOnlineList: memberOnlineList.filter(
          (item) => item.User.id !== userId,
        ),
      };
    });
  },

  //emit
  emit_updatePaperName(name = 'Untitled') {
    const { socket } = useSocketIoStore.getState();
    if (!socket) return;

    socket.emit('paper:update_name', name);

    set(({ paper }) => {
      if (paper) {
        return {
          paper: {
            ...paper,
            name,
          },
        };
      } else {
        return {
          paper: null,
        };
      }
    });
  },
  emit_memberMouseMoving(pointer) {
    const { socket } = useSocketIoStore.getState();
    if (!socket) return;

    socket.volatile.emit('member:mouse_moving', { pointer });
  },
}));

export default usePaperStore;
