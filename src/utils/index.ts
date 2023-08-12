import { DrawnObjectType } from '@/store/drawn_object_store';
import { v4 } from 'uuid';
import { Frame } from './customFabricClass';
import { fabric } from 'fabric';
export function uuid(): string {
  return v4();
}

export function calcCoordSelection(selected: fabric.Object[]) {
  let coord;
  let obj = selected[0] as fabric.Object;

  if (selected.length > 1) {
    coord = obj.group?.aCoords;
  } else {
    coord = obj.aCoords;
  }
  return coord;
}

export const browserStore = {
  addToken: (token: string) => {
    localStorage.setItem('token', token);
  },
  removeToken: () => {
    localStorage.removeItem('token');
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export function convertDataLessToCanvasObj(
  obj: DrawnObjectType,
): null | fabric.Object {
  switch (obj.type) {
    case 'rect':
      return new fabric.Rect(obj);

    case 'textbox':
      if (obj.isFrameLabel) {
        return null;
      } else {
        return new fabric.Textbox('', obj);
      }
    case 'path':
      return new fabric.Path(obj.path, obj);
    case 'frame':
      return new Frame(obj);

    default:
      return null;
  }
}
