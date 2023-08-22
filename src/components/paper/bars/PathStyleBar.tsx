import StrokeWidthRange from '@/components/stylePopup/StrokeWidthRange';
import React from 'react';
import WallIcon from './WallIcon';
import { CanvasObjectType } from '@/types/types';
import { useState, useEffect } from 'react';
import usePaperStore from '@/store/paper_store';
import ColorPickerList from '@/components/stylePopup/ColorPickerList';
import { convertHexToRGBA, convertRGBAToHex } from '@/utils';

type Props = {
  listPaths: CanvasObjectType[];
};

export default function PathStyleBar({ listPaths }: Props) {
  const { canvas } = usePaperStore();

  const [rangeValue, setRangeValue] = useState(1);
  const [activeColor, setActiveColor] = useState('#ffffff');
  const [showPickColor, setShowPickColor] = useState(false);

  useEffect(() => {
    let strokeWidthSeleted = listPaths[0].strokeWidth || 1;
    let color = listPaths[0].stroke || '#ffffff';
    if (listPaths[0].ct_hightLightPen) {
      color = convertRGBAToHex(color);
    }
    setActiveColor(color);
    setRangeValue(strokeWidthSeleted * 3);

    return () => {};
  }, [listPaths]);

  if (!canvas) return null;

  return (
    <>
      <StrokeWidthRange
        className="w-20 bg-red flex items-center mx-3"
        value={rangeValue}
        handleRangeChange={(val) => {
          setRangeValue(val);

          listPaths.map((path) => {
            if (!canvas) return;
            let width = val / 3;
            if (width < 1) width = 1;
            path.set({
              strokeWidth: width,
            });
            canvas.requestRenderAll();
          });
        }}
      />
      <WallIcon />
      <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all relative">
        <div
          className="w-5 h-5 rounded-full transition-all opacity-90 hover:opacity-100"
          style={{
            backgroundColor: activeColor,
          }}
          onClick={() => {
            setShowPickColor(true);
          }}
        ></div>
        {showPickColor && (
          <ColorPickerList
            className="absolute top-full left-0 bg-white py-3 shadow-lg rounded translate-y-1"
            activedColor={activeColor}
            handlePick={(color) => {
              setActiveColor(color);
              listPaths.map((path) => {
                let _color = color;
                if (path.ct_hightLightPen) {
                  _color = convertHexToRGBA(color, 50);
                }
                path.set({
                  stroke: _color,
                });
                canvas.requestRenderAll();
              });
              setShowPickColor(false);
            }}
          />
        )}
      </div>
      <WallIcon />
    </>
  );
}
