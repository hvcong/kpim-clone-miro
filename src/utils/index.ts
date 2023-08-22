import { CanvasObjectType } from '@/store/drawn_object_store';
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
    coord = obj.group?.oCoords;
  } else {
    coord = obj.oCoords;
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
  obj: CanvasObjectType,
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

export function mysqlDateToJs(mysqlDate: string) {
  const t: any[] = mysqlDate.split(/[- :]/);

  // Apply each element to the Date function
  const d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));

  return d;
}

export function sqlToHHmmDDmmYYYY(date: string) {
  var myDate = new Date(date);
  console.log(myDate);
  let d = myDate.getDate();
  let m = myDate.getMonth() + 1;
  let y = myDate.getFullYear();
  let hh = myDate.getHours();
  let minutes = myDate.getMinutes();

  let _d: string = String(d);
  let _m: string = String(m);
  let _hh = String(hh);
  let _minutes = String(minutes);

  if (d < 10) {
    _d = '0' + d;
  }
  if (m < 10) {
    _m = '0' + m;
  }
  if (hh < 10) {
    _hh = '0' + hh;
  }

  if (minutes < 10) {
    _minutes = '0' + minutes;
  }

  return _hh + ':' + _minutes + ' , ' + d + '/' + m + '/' + y;
}

export function sqlDateToHHmm(date: string) {
  var myDate = new Date(date);

  let hh = myDate.getHours();
  let minutes = myDate.getMinutes();

  let _hh: string = String(hh);
  let _minutes: string = String(minutes);

  if (hh < 10) {
    _hh = '0' + hh;
  }

  if (minutes < 10) {
    _minutes = '0' + minutes;
  }

  return _hh + ':' + _minutes;
}

export function generateColorFromUUID(uuidString: string) {
  const goldenRatio = 0.618033988749895;
  let hue = parseInt(uuidString.replace(/-/g, ''), 16) % 360;
  hue = (hue + hue * goldenRatio) % 360;

  const saturation = 0.5;
  const value = 0.95;

  const { r, g, b } = hsvToRgb(hue, saturation, value);
  const backgroundColor = `rgb(${r}, ${g}, ${b})`;

  const textColor = '#ffffff';

  return { backgroundColor, textColor };
}

function hsvToRgb(h: number, s: number, v: number) {
  const c = s * v;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r, g, b;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function convertHexToRGBA(hexColor: string, opacity: number) {
  // Remove the '#' character if present
  hexColor = hexColor.replace('#', '');

  // Extract the RGB components from the hexadecimal color
  const red = parseInt(hexColor.substring(0, 2), 16);
  const green = parseInt(hexColor.substring(2, 4), 16);
  const blue = parseInt(hexColor.substring(4, 6), 16);

  // Convert the opacity to a value between 0 and 1
  const alpha = opacity / 100;

  // Create the RGBA color string
  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  return rgbaColor;
}

export function convertRGBAToHex(rgbaColor: string) {
  // Extract the RGB components and opacity from the RGBA color
  const rgbaValues = rgbaColor.match(/\d+/g);
  if (!rgbaValues) return '#ffffff';
  const red = parseInt(rgbaValues[0]);
  const green = parseInt(rgbaValues[1]);
  const blue = parseInt(rgbaValues[2]);
  const alpha = parseFloat(rgbaValues[3]);

  // Convert the RGB components to hexadecimal
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Create the hexadecimal color string
  const hexColor = `#${redHex}${greenHex}${blueHex}`;

  return hexColor;
}
