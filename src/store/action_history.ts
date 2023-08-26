import { create } from 'zustand';
import usePaperStore from './paper_store';
import { CanvasObjectType } from '@/types/types';
import { convertDataLessToCanvasObj } from '@/utils';
import useDrawnStore from './drawn_object_store';
import { moreProperties } from './socketio_store';

export enum eActionType {
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  ADD = 'ADD',
}

export type CanvasObjectLessDataType = {
  id: string;
} & fabric.Object;

type ActionHistoryItemType = {
  beforeObjDataList?: CanvasObjectLessDataType[];
  actionType: eActionType;
  currentObjDataList: CanvasObjectLessDataType[];
};

type State = {
  actionList: ActionHistoryItemType[];
  currentIndex: number;
};

type Actions = {
  addAction: (action: ActionHistoryItemType) => void;
  toUndoAction: () => void;
  toReUndoAction: () => void;
  reSetActionHistory: () => void;
  refreshActionWhenObjChangeByOtherUser: (objectIdList: string[]) => void;
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
      action.currentObjDataList.map((objLessData) => {
        if (obj.id === objLessData.id) {
          isExists = true;
        }
      });
      return isExists;
    });

    switch (action.actionType) {
      case eActionType.ADD:
        canvas.remove(...targetList);
        canvas.requestRenderAll();
        canvas.fire('object:removed_many', { targetList });
        break;

      case eActionType.UPDATE:
        if (!action.beforeObjDataList) return;

        for (let i = 0; i < targetList.length; i++) {
          const target = targetList[i];
          action.beforeObjDataList.map((item) => {
            if (target.id === item.id) {
              target.set({
                ...item,
              });
              target.setCoords();
            }
          });
        }

        canvas.requestRenderAll();
        canvas.fire('object:re_modified_many', {
          targetList: targetList,
        });
        break;

      case eActionType.DELETE:
        let { drawnObjList } = useDrawnStore.getState();
        let _list: fabric.Object[] = [];
        action.currentObjDataList.map((item) => {
          let value: string = '';
          drawnObjList.map((_item) => {
            if (_item.id === item.id) value = _item.value;
          });
          let newCvObj = convertDataLessToCanvasObj(JSON.parse(value));
          if (newCvObj) {
            _list.push(newCvObj);
          }
        });
        canvas.add(..._list);
        canvas.fire('object:re_added_many', { targetList: _list });
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

    console.log(action);
    let allCanvasObj = canvas.getObjects() as CanvasObjectType[];
    let targetList = allCanvasObj.filter((obj) => {
      let isExists = false;
      action.currentObjDataList.map((objLessData) => {
        if (obj.id === objLessData.id) {
          isExists = true;
        }
      });
      return isExists;
    });

    switch (action.actionType) {
      case eActionType.ADD:
        let { drawnObjList } = useDrawnStore.getState();
        let _list: fabric.Object[] = [];
        action.currentObjDataList.map((item) => {
          let value: string = '';
          drawnObjList.map((_item) => {
            if (_item.id === item.id) value = _item.value;
          });
          let newCvObj = convertDataLessToCanvasObj(JSON.parse(value));
          if (newCvObj) {
            _list.push(newCvObj);
          }
        });
        canvas.add(..._list);
        canvas.fire('object:re_added_many', { targetList: _list });
        break;

      case eActionType.UPDATE:
        for (let i = 0; i < targetList.length; i++) {
          const target = targetList[i];
          action.currentObjDataList.map((item) => {
            if (target.id === item.id) {
              target.set({
                ...item,
              });
              target.setCoords();
            }
          });
        }

        canvas.requestRenderAll();
        canvas.fire('object:re_modified_many', {
          targetList: targetList,
        });
        break;

      case eActionType.DELETE:
        canvas.remove(...targetList);
        canvas.fire('object:removed_many', { targetList });
        canvas.requestRenderAll();
        break;
    }

    set({
      currentIndex: currentIndex + 1,
    });
  },
  reSetActionHistory() {
    set({
      ...initState,
    });
  },
  refreshActionWhenObjChangeByOtherUser(objectIdList) {
    console.log('refresh', objectIdList);

    const { actionList, currentIndex } = get();
    if (actionList.length === 0) return;

    let newActionList: ActionHistoryItemType[] = [];
    let newIndex = currentIndex;
    let currentAction: ActionHistoryItemType | null = null;
    if (currentIndex >= 0) {
      currentAction = actionList[currentIndex];
    }

    let _objectIdList = [...objectIdList];

    actionList.map((action, index) => {
      let currentObjDataList = action.currentObjDataList;
      let isExist = false;

      currentObjDataList.map((obj) => {
        if (_objectIdList.includes(obj.id)) {
          isExist = true;
        }
      });

      if (isExist) {
        _objectIdList.push(...currentObjDataList.map((obj) => obj.id));
      }
    });

    actionList.map((action, index) => {
      let currentObjDataList = action.currentObjDataList;
      let isExist = false;

      currentObjDataList.map((obj) => {
        if (_objectIdList.includes(obj.id)) {
          isExist = true;
        }
      });

      if (isExist) {
        if (index <= currentIndex) {
          newIndex = newIndex - 1;
        }
      } else {
        newActionList.push(action);
      }
    });

    console.log('new', newActionList, newIndex);

    set({
      actionList: newActionList,
      currentIndex: newIndex,
    });
  },
}));

export default useActionHistory;
