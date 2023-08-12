import React from 'react';
import StrokeWidthRange from './StrokeWidthRange';
import ColorPickerList from './ColorPickerList';
import useToolStore from '@/store/tool_store';

type Props = {
  className: string;
};

export default function PenStylePopup({ className }: Props) {
  const { penStyle, setPenStyle } = useToolStore();

  function handlePick(color: string) {
    setPenStyle({
      ...penStyle,
      color,
    });
  }

  function handleRangeChange(value: number) {
    setPenStyle({
      ...penStyle,
      strokeWidth: value,
    });
  }

  return (
    <div className={className}>
      <div className="w-44 h-60 bg-white rounded-md shadow-lg cursor-default">
        <StrokeWidthRange
          className="px-3 pt-3 pb-2"
          handleRangeChange={handleRangeChange}
          value={penStyle.strokeWidth}
        />
        <div className="text-xs px-3 pb-3">Thickness</div>
        <ColorPickerList
          className=""
          handlePick={handlePick}
          activedColor={penStyle.color}
        />
      </div>
    </div>
  );
}
