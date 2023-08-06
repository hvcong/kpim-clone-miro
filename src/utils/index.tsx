import { v4 } from 'uuid';
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
