import { BgTransparentIcon, ChatIcon } from '@/components/svgs';
import React from 'react';
import WallIcon from './WallIcon';
import { CanvasObjectType } from '@/types/types';

type Props = {
  listByCategory: {
    [key: string]: CanvasObjectType[];
  };
};

export default function ShapeStyleBar({ listByCategory }: Props) {
  return (
    <>
      <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all ">
        <div className="w-5 h-5 rounded-full border-2 border-gray-600 group-hover:border-gray-800"></div>
      </div>
      <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all">
        <div className="w-5 h-5 rounded-full border-4 border-gray-600"></div>
      </div>
      <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all">
        <BgTransparentIcon className="w-5 h-5" />
      </div>
      <WallIcon />
      <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all">
        <ChatIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
      </div>
    </>
  );
}
