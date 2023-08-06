import { create } from 'zustand';

export type DrawObjectType = {
  id: string;
  [key: string]: any;
} & fabric.Object &
  fabric.Group;

type StateType = {
  drawnObjectList: DrawObjectType[];
};

const moreProperties = [
  'id',
  'isLocked',
  'frameId',
  'isFrameLabel',
  'frameLabel',
];

type ActionType = {
  addOne: (newObj: DrawObjectType) => void;
  removeOne: (obj: DrawObjectType) => void;
  updateOne: (obj: DrawObjectType) => void;
  resetDrawnState: () => void;
};

const initState = {
  drawnObjectList: [],
};

const useDrawnStore = create<StateType & ActionType>((set, get) => ({
  ...initState,
  resetDrawnState: () => {
    set({
      ...initState,
    });
  },

  addOne: (newObj) => {
    set(({ drawnObjectList }) => ({
      drawnObjectList: [
        ...drawnObjectList,
        newObj.toDatalessObject(moreProperties),
      ],
    }));
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
}));

export default useDrawnStore;
