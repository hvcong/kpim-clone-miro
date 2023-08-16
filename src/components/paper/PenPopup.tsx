import useToolStore from '@/store/tool_store';
import React, { useEffect, useRef } from 'react';
import { CloseIcon, EraserIcon, HightLightPenIcon, PenIcon } from '../svgs';
import { useState } from 'react';
import PenStylePopup from '../stylePopup/PenStylePopup';

type Props = {
  show: boolean | undefined;
  close: () => void;
};

export default function PenPopup({ show, close }: Props) {
  const { penType, tool, setPenStyle, setPenType, penStyle } = useToolStore();

  const [showColorPicker, setShowColorPicker] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowColorPicker(false);

    return () => {};
  }, [penType]);

  return (
    <div
      className={`absolute top-1/2 left-full  bg-white -translate-y-1/2 translate-x-2 shadow-lg rounded-md ${
        !show && 'hidden'
      }`}
      ref={containerRef}
    >
      <div
        className="w-11 h-11 flex justify-center items-center group"
        onClick={(e) => {
          close();
          e.stopPropagation();
        }}
      >
        <CloseIcon className="w-5 h-5 group-hover:text-blue-600" />
      </div>
      <div className="w-5 border-t border-gray-300 mx-auto"></div>

      <div
        className="w-11 h-11 flex justify-center items-center group"
        onClick={(e) => {
          setPenType('default');

          e.stopPropagation();
        }}
      >
        <PenIcon
          className={`w-5 h-5 group-hover:text-blue-600 ${
            penType === 'default' && 'text-blue-600'
          }`}
        />
      </div>
      <div
        className="w-11 h-11 flex justify-center items-center group"
        onClick={(e) => {
          setPenType('hightlight');
          e.stopPropagation();
        }}
      >
        <HightLightPenIcon
          className={`w-5 h-5 group-hover:text-blue-600 ${
            penType === 'hightlight' && 'text-blue-600'
          }`}
        />
      </div>
      <div
        className="w-11 h-11 flex justify-center items-center group"
        onClick={(e) => {
          setPenType('eraser');
          e.stopPropagation();
        }}
      >
        <EraserIcon
          className={`w-5 h-5 group-hover:text-blue-600 ${
            penType === 'eraser' && 'text-blue-600'
          }`}
        />
      </div>

      <div className="w-5 border-t border-gray-300 mx-auto"></div>

      <div className="w-11 h-11 flex justify-center items-center relative">
        <div
          className=" rounded-full border-2 border-gray-500 h-6 w-6 flex justify-center items-center"
          onClick={(e) => {
            setShowColorPicker(!showColorPicker);
          }}
        >
          <div
            className="w-1 h-1 bg-gray-300 rounded-full"
            style={{
              backgroundColor: penStyle.color,
              width: penStyle.strokeWidth < 10 ? 3 : penStyle.strokeWidth + '%',
              height:
                penStyle.strokeWidth < 10 ? 3 : penStyle.strokeWidth + '%',
            }}
          ></div>
        </div>
        {showColorPicker && (
          <PenStylePopup className="absolute left-full top-1/2 translate-x-1 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
}
