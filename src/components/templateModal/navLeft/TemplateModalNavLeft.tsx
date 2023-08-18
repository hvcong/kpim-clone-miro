import React from 'react';
import { useState } from 'react';

type Props = {
  className: string;
  itemActived: string;
  setItemActived: (actived: string) => void;
};

export default function TemplateModalNavLeft({
  className,
  itemActived,
  setItemActived,
}: Props) {
  return (
    <div className={className}>
      <div className="flex flex-col space-y-1">
        <div className="">
          <div
            className={`inline-block rounded-[32px] py-1 px-3 transition-all  cursor-pointer ${
              itemActived === 'my-template'
                ? 'text-white bg-blue-950'
                : 'text-black bg-white hover:bg-gray-200'
            }`}
            onClick={() => {
              setItemActived('my-template');
            }}
          >
            My template
          </div>
        </div>

        <div className="">
          <div
            className={`inline-block rounded-[32px] py-1 px-3 transition-all  cursor-pointer ${
              itemActived === 'recent'
                ? 'text-white bg-blue-950'
                : 'text-black bg-white hover:bg-gray-200'
            }`}
            onClick={() => {
              setItemActived('recent');
            }}
          >
            Recent
          </div>
        </div>
        <div className="">
          <div
            className={`inline-block rounded-[32px] py-1 px-3 transition-all  cursor-pointer ${
              itemActived === 'popular'
                ? 'text-white bg-blue-950'
                : 'text-black bg-white hover:bg-gray-200'
            }`}
            onClick={() => {
              setItemActived('popular');
            }}
          >
            Popular
          </div>
        </div>
        <div className="">
          <div
            className={`inline-block rounded-[32px] py-1 px-3 transition-all  cursor-pointer ${
              itemActived === 'building-block'
                ? 'text-white bg-blue-950'
                : 'text-black bg-white hover:bg-gray-200'
            }`}
            onClick={() => {
              setItemActived('building-block');
            }}
          >
            Building Blocks
          </div>
        </div>
      </div>
    </div>
  );
}
