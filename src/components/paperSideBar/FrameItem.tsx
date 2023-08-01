import React, { useState } from "react";
import { ThreeDotsIcon } from "../svgs";
import { StyleListShowType } from "./FrameList";

type Props = {
  index: number;
  active: boolean;
  setActive: () => void;
  styleListShow: StyleListShowType;
};

export default function FrameItem({ index, active, setActive, styleListShow }: Props) {
  return (
    <div
      className={`group relative rounded hover:bg-gray-300 transition-all 
      ${styleListShow === "normal" ? "border" : "border-2"}
      ${active ? "border-blue-600 bg-gray-300 border-2" : "border-gray-300"}
      `}
      onClick={() => {
        setActive();
      }}
    >
      {styleListShow === "normal" && <canvas className='h-36 w-full'></canvas>}
      <div className={` ${styleListShow === "normal" && "absolute bottom-0 left-0 right-0"}`}>
        <div
          className={`bg-white flex justify-between  transition-all duration-200 pointer-events-none   group-hover:opacity-100 group-hover:pointer-events-auto 
          ${!active && styleListShow === "normal" && "translate-y-1/4  opacity-0"}
          ${styleListShow === "normal" ? " rounded-b" : "rounded"}
          ${styleListShow === "normal" && "group-hover:translate-y-0"}

          `}
        >
          <div className='flex items-center p-3  text-sm'>
            <div className='pr-2 font-semibold'>{index}</div>
            <div className=''>Frame 1</div>
          </div>
          <div className='p-3'>
            <ThreeDotsIcon className='w-5 h-5 text-gray-800' />
          </div>
        </div>
      </div>
    </div>
  );
}