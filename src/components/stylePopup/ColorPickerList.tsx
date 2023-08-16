import React from 'react';
import { CheckIcon } from '../svgs';

type Props = {
  className: string;
  activedColor: string;
  handlePick: (color: string) => void;
};

var colors = [
  { name: 'White', color: '#ffffff' },
  { name: 'Red', color: '#ff0000' },
  { name: 'Green', color: '#00ff00' },
  { name: 'Blue', color: '#0000ff' },
  { name: 'Yellow', color: '#ffff00' },
  { name: 'Purple', color: '#800080' },
  { name: 'Orange', color: '#ffa500' },
  { name: 'Pink', color: '#ffc0cb' },
  { name: 'Gray', color: '#808080' },
  { name: 'Brown', color: '#a52a2a' },
  { name: 'Black', color: '#000000' },
  { name: 'Cyan', color: '#00ffff' },
  { name: 'Silver', color: '#c0c0c0' },
  { name: '#7242f5', color: '#7242f5' },
  { name: '#f59042', color: '#f59042' },
  { name: '#7bf542', color: '#7bf542' },
];
export default function ColorPickerList({
  className,
  activedColor,
  handlePick,
}: Props) {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-3 px-3 w-44 bg-white">
        {colors.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-full flex items-center justify-center border border-gray-300 w-7 h-7 hover:scale-125 transition-all cursor-pointer"
              style={{
                backgroundColor: item.color,
              }}
              onClick={() => {
                handlePick(item.color);
              }}
            >
              {activedColor === item.color && (
                <CheckIcon className="w-3 h-3 text-gray-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
