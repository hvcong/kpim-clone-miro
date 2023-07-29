import { create } from "zustand";

type PaperStateType = {
  scale: number;
  pointScale: {
    x: number;
    y: number;
  };
  canvas: fabric.Canvas | null;

  setScale: (scale: number, x: number, y: number) => void;
  setCanvas: (canvas: fabric.Canvas | null) => void;
};

const usePaperStore = create<PaperStateType>((set) => ({
  scale: 1,
  canvas: null,
  pointScale: {
    x: 0,
    y: 0,
  },
  setScale: (scale, x, y) => {
    set({ scale: scale, pointScale: { x, y } });
  },
  setCanvas: (canvas: fabric.Canvas | null) => {
    set({
      canvas,
    });
  },
}));

export default usePaperStore;
