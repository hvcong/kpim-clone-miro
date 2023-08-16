import { create } from 'zustand';
import usePaperStore from './paper_store';
import { convertHexToRGBA } from '@/utils';

type ToolType = 'pen' | 'text' | 'default' | 'shape' | 'comment';
type ShapeType = 'rectangle' | 'eclipse' | 'square' | 'triangle' | 'star';
type PenType = 'hightlight' | 'default' | 'eraser';

type ToolStateType = {
  tool: ToolType;
  shapeType: ShapeType;
  penType: PenType;
  penStyle: {
    color: string;
    strokeWidth: number;
  };
};

type ToolActionType = {
  setTool: (tool: ToolType) => void;
  setShapeType: (shapeType: ShapeType | undefined) => void;
  setPenStyle: (penStyle: { color: string; strokeWidth: number }) => void;
  setPenType: (penType: PenType) => void;
  getPenType: () => string;
  resetToolStore: () => void;
};

const initToolStore: ToolStateType = {
  shapeType: 'rectangle',
  tool: 'default',
  penType: 'default',
  penStyle: {
    color: '#000000',
    strokeWidth: 1,
  },
};

const useToolStore = create<ToolStateType & ToolActionType>((set, get) => ({
  ...initToolStore,
  setTool: (tool = 'default') => {
    set({ tool });
  },
  setShapeType: (shapeType = 'rectangle') => {
    set({ shapeType });
  },
  setPenStyle: (penStyle) => {
    const { canvas } = usePaperStore.getState();
    if (!canvas) return;

    const { penType } = get();

    let color = penStyle.color;

    if (penType === 'hightlight') {
      color = convertHexToRGBA(color, 40);
    }
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width =
      penStyle.strokeWidth / 3 < 1 ? 1 : penStyle.strokeWidth / 3;

    set({ penStyle });
  },
  setPenType: (penType) => {
    const { canvas } = usePaperStore.getState();
    if (!canvas) return;
    let { penStyle } = get();

    let color = penStyle.color;
    if (penType === 'hightlight') {
      color = convertHexToRGBA(color, 50);
    } else if (penType === 'eraser') {
    }
    canvas.freeDrawingBrush.color = color;

    set({ penType });
  },
  getPenType() {
    return get().penType;
  },
  resetToolStore() {
    set({
      ...initToolStore,
    });
  },
}));

export default useToolStore;
