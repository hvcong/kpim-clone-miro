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
  on_addOne: (newObj: DrawnObject) => void;
  on_removeOne: (obj: DrawnObject) => void;
  on_updateOne: (obj: DrawnObject) => void;
  on_removeMany: (list: DrawnObject[]) => void;
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

    let value = newObj.toDatalessObject(moreProperties);

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
    console.log(updatedList.map((item) => item.ChangeLog.type));

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
}));

export default useDrawnStore;
