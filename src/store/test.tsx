import { create } from "zustand";

const useTest = create((set) => ({
  allData: [],
  set: set,
}));

export default useTest;
