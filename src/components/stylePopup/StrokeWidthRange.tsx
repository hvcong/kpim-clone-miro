import React from 'react';
import { useState } from 'react';

type Props = {
  className: string;
  handleRangeChange: (value: number) => void;
  value: number;
};

export default function StrokeWidthRange({
  className,
  value,
  handleRangeChange,
}: Props) {
  return (
    <div className={className}>
      <input
        type="range"
        value={value}
        onChange={(e) => {
          let value = Number(e.target.value || 0);
          console.log(value);
          handleRangeChange(value);
        }}
        className="w-full h-0.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
}
