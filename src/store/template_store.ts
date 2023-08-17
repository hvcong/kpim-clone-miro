import { create } from 'zustand';

type TemplateType = {};

type StateType = {
  templateList: TemplateType[];
  showTemplateModal: boolean;
};

type ActionType = {
  setTemplateList: (list: TemplateType[]) => void;
  setShowTemplateModal: (show: boolean) => void;
};

const initState: StateType = {
  templateList: [],
  showTemplateModal: true,
};

const useTemplateStore = create<StateType & ActionType>((set, get) => ({
  ...initState,
  setTemplateList(list) {
    set({
      templateList: list,
    });
  },
  setShowTemplateModal(show) {
    set({
      showTemplateModal: show,
    });
  },
}));

export default useTemplateStore;
