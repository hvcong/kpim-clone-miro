import React from 'react';
import { CheckIcon } from '../svgs';

type Props = {
  className: string;
  activedColor: string;
  handlePick: (color: string) => void;
};

const colors = [
  {
    name: 'White',
    color: '#fff',
  },
  {
    name: 'Red',
    color: 'red',
  },
  {
    name: 'Yellow',
    color: 'yellow',
  },
  {
    name: 'Black',
    color: 'black',
  },
  {
    name: 'White',
    color: '#fff',
  },
  {
    name: 'Red',
    color: 'red',
  },
  {
    name: 'Yellow',
    color: 'yellow',
  },
  {
    name: 'Black',
    color: 'black',
  },
  {
    name: 'White',
    color: '#fff',
  },
  {
    name: 'Red',
    color: 'red',
  },
  {
    name: 'Yellow',
    color: 'yellow',
  },
  {
    name: 'Black',
    color: 'black',
  },
  {
    name: 'White',
    color: '#fff',
  },
  {
    name: 'Red',
    color: 'red',
  },
  {
    name: 'Yellow',
    color: 'yellow',
  },
  {
    name: 'Black',
    color: 'black',
  },
];
export default function ColorPickerList({
  className,
  activedColor,
  handlePick,
}: Props) {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-3 px-3">
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
