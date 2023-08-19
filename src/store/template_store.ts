import { CanvasObjectType } from '@/types/types';
import { create } from 'zustand';
import useSocketIoStore, { moreProperties } from './socketio_store';
import { useMutation } from 'react-query';

type TemplateType = {};

type StateType = {
  templateList: TemplateType[];
  showTemplateModal: boolean;
  saveModalState: {
    show: boolean;
    list: CanvasObjectType[];
  };

  isAdding: boolean;
  isLoading: boolean;
};

type ActionType = {
  setTemplateList: (list: TemplateType[]) => void;
  setShowTemplateModal: (show: boolean) => void;
  setSaveModalState: (saveModalState: {
    show: boolean;
    list: CanvasObjectType[];
  }) => void;
};

const initState: StateType = {
  templateList: [],
  showTemplateModal: false,
  saveModalState: {
    show: false,
    list: [],
  },

  isAdding: false,
  isLoading: false,
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
  setSaveModalState(state) {
    set({
      saveModalState: state,
    });
  },
}));

export default useTemplateStore;
