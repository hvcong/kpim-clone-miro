import { create } from "zustand";

type PaperStateType = {
  scale: number;
  canvas: fabric.Canvas | null;

  setScale: (scale: number) => void;
  setCanvas: (canvas: fabric.Canvas) => void;
};

const usePaperStore = create<PaperStateType>((set) => ({
  scale: 100,
  canvas: null,
  setScale: (scale) => {
    set({ scale: scale });
  },
  setCanvas: (canvas: fabric.Canvas) => {
    set({
      canvas,
    });
  },
}));

export default usePaperStore;
