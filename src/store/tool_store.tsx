import { create } from "zustand";

type ToolType = "pen" | "text" | "default" | "shape";
type ShapeType = "rectangle" | "eclipse" | "square" | "triangle" | "star";
type PenType = "hightlight" | "default" | "eraser";

type ToolStateType = {
  tool: ToolType;
  shapeType: ShapeType;
  penType: PenType;
  penStyle: {
    color: string;
    strokeWidth: number;
  };
  setTool: (tool: ToolType) => void;
  setShapeType: (shapeType: ShapeType | undefined) => void;
  setPenStyle: (penStyle: { color: string; strokeWidth: number } | undefined) => void;
  setPenType: (penType: PenType) => void;
};

const useToolStore = create<ToolStateType>((set) => ({
  tool: "default",
  shapeType: "rectangle",
  penType: "default",
  penStyle: {
    color: "#000",
    strokeWidth: 1,
  },
  setTool: (tool = "default") => {
    set({ tool });
  },
  setShapeType: (shapeType = "rectangle") => {
    set({ shapeType });
  },
  setPenStyle: (penStyle = { color: "#000", strokeWidth: 1 }) => {
    set({ penStyle });
  },
  setPenType: (penType) => {
    set({ penType });
  },
}));

export default useToolStore;
