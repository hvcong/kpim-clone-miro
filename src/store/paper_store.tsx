import { EnumType } from "typescript";
import { create } from "zustand";

type RightSideBarType = "comment" | "message" | "";
type LeftSideBarType = "frame" | "history" | "";

type PaperStateType = {
  scale: number;
  rightSideBarType: RightSideBarType;
  leftSideBarType: LeftSideBarType;
  showCursorPartner: boolean;
  pointScale: {
    x: number;
    y: number;
  };
  canvas: fabric.Canvas | null;
  drawnObjs: [];
  showPaperDetailModal: boolean;

  setScale: (scale: number, x: number, y: number) => void;
  setCanvas: (canvas: fabric.Canvas | null) => void;
  setRightSideBarType: (type: RightSideBarType) => void;
  setLeftSideBarType: (type: LeftSideBarType) => void;
  setShowCursorPartner: (show: boolean) => void;
  setShowPaperDetailModal: (show: boolean) => void;
};

const usePaperStore = create<PaperStateType>((set) => ({
  scale: 1,
  canvas: null,
  pointScale: {
    x: 0,
    y: 0,
  },
  drawnObjs: [],
  rightSideBarType: "",
  leftSideBarType: "",
  showCursorPartner: false,
  showPaperDetailModal: false,
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
}));

export default usePaperStore;
