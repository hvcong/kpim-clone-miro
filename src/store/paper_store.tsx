import { EnumType } from 'typescript';
import { create } from 'zustand';
import { fabric } from 'fabric';
import { Paper } from '@/utils/types';

type RightSideBarType = 'comment' | 'message' | string;
type LeftSideBarType = 'frame' | 'history' | string;

type PaperStateType = {
  paper: Paper | null;
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
};

const initPaperState = {
  paper: null,
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

const usePaperStore = create<PaperStateType>((set) => ({
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
}));

export default usePaperStore;
