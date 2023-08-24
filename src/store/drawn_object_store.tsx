import drawnObjApi from '@/api/drawnObjApi';
import { create } from 'zustand';
import { UseBoundStore, StoreApi } from 'zustand';
import usePaperStore from './paper_store';
import { useMutation } from 'react-query';
import useGlobalStore, { eToastType } from '.';
import useSocketIoStore, { moreProperties } from './socketio_store';
import { convertDataLessToCanvasObj } from '@/utils';
import { Socket } from 'socket.io-client';
import { CanvasObjectType, DrawnObject } from '@/types/types';
import useActionHistory, {
  CanvasObjectLessDataType,
  eActionType,
} from './action_history';

type StateType = {
  drawnObjList: DrawnObject[];
};

type ActionType = {
  resetDrawnState: () => void;
  setDrawnObjList: (drawnObjList: DrawnObject[]) => void;
  addOne: (newObj: CanvasObjectType) => void;
  removeOne: (obj: CanvasObjectType) => void;
  removeMany: (list: CanvasObjectType[]) => void;
  updateOne: (obj: CanvasObjectType) => void;
  updateMany: (list: CanvasObjectType[]) => void;
  on_addOne: (newObj: DrawnObject) => void;
  on_removeOne: (obj: DrawnObject) => void;
  on_updateOne: (obj: DrawnObject) => void;
  on_removeMany: (list: DrawnObject[]) => void;
  on_updateMany: (list: DrawnObject[]) => void;
};

const initState = {
  drawnObjList: [],
};

const useDrawnStore = create<StateType & ActionType>((set, get) => ({
  ...initState,
  resetDrawnState: () => {
    set(initState);
  },
  setDrawnObjList: (drawnObjList) => {
    const { canvas } = usePaperStore.getState();
    if (!canvas) return;

    set({
      drawnObjList: drawnObjList,
    });
  },
  addOne: async (newObj) => {
    const { socket } = useSocketIoStore.getState();
    if (!socket) return;
    const { addAction } = useActionHistory.getState();
    let value = newObj.toDatalessObject(
      moreProperties,
    ) as CanvasObjectLessDataType;
    addAction({
      id: value.id,
      canvasObjLessDataList: [value],
      actionType: eActionType.ADD,
    });

    socket.emit(
      'drawn_obj:add',
      {
        value,
      },
      (data: DrawnObject) => {
        let { drawnObjList } = get();
        set({
          drawnObjList: [data, ...drawnObjList],
        });
      },
    );
  },
  removeOne: (obj) => {
    const { socket } = useSocketIoStore.getState();
    if (!socket) return;

    socket.emit('drawn_obj:remove_one', obj.id, (data: DrawnObject) => {
      let { drawnObjList } = get();
      let _list = drawnObjList.filter((item) => item.id !== data.id);
      _list.unshift(data);
      set({
        drawnObjList: _list,
      });
    });
  },
  removeMany(list) {
    const { socket } = useSocketIoStore.getState();
    if (!socket) return;
    let { setBotoomToast } = useGlobalStore.getState();

    setBotoomToast('Removing...');

    socket.emit(
      'drawn_obj:remove_many',
      list.map((item) => item.id),
      (data: DrawnObject[] | null) => {
        let { drawnObjList } = get();

        if (!data) {
          setBotoomToast('Have an error', 2000, eToastType.error);
        } else {
          let _list = drawnObjList.filter((item) => {
            let isExist = false;
            data.map((_item) => {
              if (_item.id === item.id) isExist = true;
            });

            return !isExist;
          });
          _list.unshift(...data);
          set({
            drawnObjList: _list,
          });
          setBotoomToast('');
        }
      },
    );
  },

  updateOne: (obj) => {
    const { socket } = useSocketIoStore.getState();
    if (!socket) return;
    const canvasObj = obj.toDatalessObject(moreProperties);
    console.log(canvasObj);

    socket.emit(
      'drawn_obj:update_one',
      canvasObj,
      function callback(data: DrawnObject) {
        const { drawnObjList } = get();
        let _list = drawnObjList.filter((item) => item.id !== data.id);
        _list.unshift(data);
        set({
          drawnObjList: _list,
        });
      },
    );
  },
  updateMany(list) {
    const { socket } = useSocketIoStore.getState();
    if (!socket) return;
    const { setBotoomToast } = useGlobalStore.getState();
    setBotoomToast('Updating...');

    let group = list[0].group;
    let canvasObjList = list.map((item) => {
      return item.toDatalessObject(moreProperties);
    });
    console.log('update many', canvasObjList[0]);

    // when mutiple selection created, left and top of selected objs were change, need to re-update top,left

    if (group) {
      let groupTop = group.top || 0;
      let groupLeft = group.left || 0;
      let groupHeight = group.height || 0;
      let groupWidth = group.width || 0;
      for (let i = 0; i < canvasObjList.length; i++) {
        canvasObjList[i].top =
          groupTop + groupHeight / 2 + canvasObjList[i].top;
        canvasObjList[i].left =
          groupLeft + groupWidth / 2 + canvasObjList[i].left;
      }
    }
    console.log('update many:', canvasObjList);

    socket.emit(
      'drawn_obj:update_many',
      canvasObjList,
      function callback(data: DrawnObject[]) {
        const { drawnObjList } = get();

        if (!data) {
          setBotoomToast('Have an error', 2000, eToastType.error);
        } else {
          let _list = drawnObjList.filter((item) => {
            let isExist = false;
            data.map((_item) => {
              if (_item.id === item.id) isExist = true;
            });

            return !isExist;
          });
          _list.unshift(...data);
          set({
            drawnObjList: _list,
          });
          setBotoomToast('');
        }
      },
    );
  },
  on_addOne: (newObj) => {
    const { canvas } = usePaperStore.getState();
    const { socket } = useSocketIoStore.getState();
    if (!canvas || !socket) return;

    let obj = convertDataLessToCanvasObj(
      JSON.parse(newObj.value),
    ) as CanvasObjectType;

    if (obj) {
      obj.ct_fromEmit = true;
      canvas.add(obj);
    }
    canvas.requestRenderAll();

    let { drawnObjList } = get();

    set({
      drawnObjList: [...drawnObjList, newObj],
    });
  },
  on_removeOne: (obj) => {
    const { canvas } = usePaperStore.getState();
    const { socket } = useSocketIoStore.getState();
    if (!canvas || !socket) return;

    let allObj = canvas.getObjects() as CanvasObjectType[];
    let target = allObj.find((item) => item.id === obj.id);
    if (target) {
      target.visible = false;
      canvas.requestRenderAll();

      let { drawnObjList } = get();
      let _list = drawnObjList.map((item) => {
        if (item.id === obj.id) {
          return obj;
        }
        return item;
      });
      set({
        drawnObjList: _list,
      });
    }
  },
  on_updateOne(obj) {
    const { canvas } = usePaperStore.getState();
    const { socket } = useSocketIoStore.getState();
    if (!canvas || !socket) return;

    /**
     * update target by set() will not fire modified event
     * - don't need to set ct_fromEmit=true
     */

    let allObj = canvas.getObjects() as CanvasObjectType[];
    let target = allObj.find((item) => item.id === obj.id);

    let canvasObjDataLess = JSON.parse(obj.value) as CanvasObjectType;
    if (target && canvasObjDataLess) {
      target.set({
        ...canvasObjDataLess,
      });

      canvas.requestRenderAll();

      let { drawnObjList } = get();
      let _list = drawnObjList.map((item) => {
        if (item.id === obj.id) {
          return obj;
        }
        return item;
      });
      set({
        drawnObjList: _list,
      });
    }
  },
  on_removeMany(updatedList) {
    const { canvas } = usePaperStore.getState();
    const { socket } = useSocketIoStore.getState();
    if (!canvas || !socket) return;

    let allCanvasObj = canvas.getObjects() as CanvasObjectType[];
    let targetList =
      allCanvasObj.filter((item) => {
        let isExist = false;
        updatedList.map((_item) => {
          if (_item.id === item.id) isExist = true;
        });

        return isExist;
      }) || [];

    targetList.map((target) => {
      target.visible = false;
    });
    canvas.requestRenderAll();

    // update state
    let { drawnObjList } = get();
    console.log('before:', drawnObjList.length, updatedList.length);

    let _list = drawnObjList.filter((item) => {
      let isExist = false;
      updatedList.map((_itemUpdated) => {
        if (_itemUpdated.id === item.id) isExist = true;
      });

      return !isExist;
    });

    _list.unshift(...updatedList);
    console.log('after:', _list.length);
    set({
      drawnObjList: _list,
    });
  },
  on_updateMany(updatedList) {
    const { canvas } = usePaperStore.getState();
    const { socket } = useSocketIoStore.getState();
    if (!canvas || !socket) return;

    let allCanvasObj = canvas.getObjects() as CanvasObjectType[];
    for (let i = 0; i < allCanvasObj.length; i++) {
      let target = allCanvasObj[i];
      updatedList.map((_item) => {
        if (_item.id === target.id) {
          let data = JSON.parse(_item.value);
          target.set({
            ...data,
          });
          target.calcACoords();
        }
      });
    }
    canvas.requestRenderAll();

    // update state
    let { drawnObjList } = get();

    let _list = drawnObjList.filter((item) => {
      let isExist = false;
      updatedList.map((_itemUpdated) => {
        if (_itemUpdated.id === item.id) isExist = true;
      });

      return !isExist;
    });

    _list.unshift(...updatedList);
    set({
      drawnObjList: _list,
    });
  },
}));

export default useDrawnStore;
