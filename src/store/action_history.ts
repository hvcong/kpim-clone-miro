import { create } from 'zustand';
import usePaperStore from './paper_store';
import { CanvasObjectType } from '@/types/types';

export enum eActionType {
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  ADD = 'ADD',
}

export type CanvasObjectLessDataType = {
  id: string;
} & fabric.Object;

type ActionHistoryItemType = {
  id: string;
  canvasObjLessDataList: CanvasObjectLessDataType[];
  actionType: eActionType;
};

type State = {
  actionList: ActionHistoryItemType[];
  currentIndex: number;
};

type Actions = {
  addAction: (action: ActionHistoryItemType) => void;
  toUndoAction: () => void;
  toReUndoAction: () => void;
};

const initState: State = {
  actionList: [],
  currentIndex: -1,
};

const useActionHistory = create<State & Actions>((set, get) => ({
  ...initState,
  addAction(newAction) {
    const { currentIndex, actionList } = get();

    let _list = [...actionList];
    if (currentIndex !== _list.length - 1) {
      _list = _list.splice(0, currentIndex + 1);
    }

    set({
      actionList: [..._list, newAction],
      currentIndex: _list.length,
    });
  },
  toUndoAction() {
    const { canvas } = usePaperStore.getState();
    const { currentIndex, actionList } = get();
    if (!canvas) return;
    if (currentIndex === -1) return;

    let action = actionList[currentIndex];
    let allCanvasObj = canvas.getObjects() as CanvasObjectType[];
    let targetList = allCanvasObj.filter((obj) => {
      let isExists = false;
      action.canvasObjLessDataList.map((objLessData) => {
        if (obj.id === objLessData.id) {
          isExists = true;
        }
      });
      return isExists;
    });

    switch (action.actionType) {
      case eActionType.ADD:
        canvas.remove(...targetList);
        canvas.fire('object:removed_many', { targetList });
        canvas.requestRenderAll();
        break;

      case eActionType.UPDATE:
        break;

      case eActionType.DELETE:
        break;
    }

    set({
      currentIndex: currentIndex - 1,
    });
  },

  toReUndoAction() {
    const { canvas } = usePaperStore.getState();
    if (!canvas) return;
    const { actionList, currentIndex } = get();
    if (currentIndex > actionList.length - 1 || actionList.length === 0) return;

    let action = actionList[currentIndex + 1];
    let allCanvasObj = canvas.getObjects() as CanvasObjectType[];
    let targetList = allCanvasObj.filter((obj) => {
      let isExists = false;
      action.canvasObjLessDataList.map((objLessData) => {
        if (obj.id === objLessData.id) {
          isExists = true;
        }
      });
      return isExists;
    });

    switch (action.actionType) {
      case eActionType.ADD:
        targetList.map((item) => {
          item.visible = true;
        });

        canvas.requestRenderAll();
        canvas.fire('object:added', { target: targetList });
        break;

      case eActionType.UPDATE:
        break;

      case eActionType.DELETE:
        break;
    }

    set({
      currentIndex: currentIndex + 1,
    });
  },
}));

export default useActionHistory;
