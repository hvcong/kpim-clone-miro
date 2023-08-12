import drawnObjApi from '@/api/drawnObjApi';
import { create } from 'zustand';
import { UseBoundStore, StoreApi } from 'zustand';
import usePaperStore from './paper_store';
import { useMutation } from 'react-query';

export type DrawnObjectType = {
  id: string;
  [key: string]: any;
} & fabric.Object &
  fabric.Group;

type StateType = {
  drawnObjectList: DrawnObjectType[];
  didUpdatedFromServer: boolean;
};

const moreProperties = [
  'id',
  'isLocked',
  'frameId',
  'isFrameLabel',
  'frameLabel',
];

type ActionType = {
  addOne: (newObj: DrawnObjectType) => void;
  removeOne: (obj: DrawnObjectType) => void;
  updateOne: (obj: DrawnObjectType) => void;
  resetDrawnState: () => void;
  setDrawnObjectList: (list: DrawnObjectType[]) => void;
  setDisUpdatedFromServer: (is: boolean) => void;
};

const initState = {
  drawnObjectList: [],
  didUpdatedFromServer: false,
};

export type DrawnStoreType = StateType & ActionType;

const useDrawnStore = create<StateType & ActionType>((set, get) => ({
  ...initState,
  resetDrawnState: () => {
    set({
      ...initState,
    });
  },

  addOne: async (newObj) => {
    console.log(newObj);
    // let data = newObj.toDatalessObject(moreProperties);

    // const { paper } = usePaperStore.getState();

    // if (paper && paper.id) {
    //   try {
    //     const res = await drawnObjApi.addOne({
    //       value: data,
    //       paperId: paper?.id,
    //     });
    //   } catch (error) {
    //     // set some state
    //   }
    // }
  },
  removeOne: (obj) => {
    set(({ drawnObjectList }) => {
      return {
        drawnObjectList: drawnObjectList.filter((item) => item.id !== obj.id),
      };
    });
  },

  updateOne: (obj) => {
    set(({ drawnObjectList }) => {
      const isFrameLabel = obj.isFrameLabel;
      const text = obj?.text;

      let _list = [...drawnObjectList];
      _list = _list.map((item) => {
        if (isFrameLabel && item.id === obj.frameId) {
          return {
            ...item,
            frameLabel: text,
          };
        }

        if (item.id === obj.id) {
          return obj.toDatalessObject(moreProperties);
        }
        return item;
      });
      return {
        drawnObjectList: _list,
      };
    });
  },
  setDrawnObjectList: (list = []) => {
    set({
      drawnObjectList: list,
    });
  },
  setDisUpdatedFromServer: (is) => {
    set({
      didUpdatedFromServer: is,
    });
  },
}));

export default useDrawnStore;
