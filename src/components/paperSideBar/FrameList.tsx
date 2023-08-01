import React, { useState } from "react";
import { CloseIcon, LayerIcon, ListIcon, PlusIcon, ThreeDotsIcon, VideoPlayIcon } from "../svgs";
import FrameItem from "./FrameItem";
import usePaperStore from "@/store/paper_store";

type Props = {};
export type StyleListShowType = "normal" | "short";

const frameList = Array(4).fill(null);

export default function FrameList({}: Props) {
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(4);
  const { setLeftSideBarType } = usePaperStore();
  const [styleListShow, setStyleListShow] = useState<StyleListShowType>("normal");

  return (
    <div className='space-y-3 flex-1 overflow-y-hidden flex flex-col'>
      <div className='flex py-3 items-center space-x-3 px-5 border-b border-gray-300'>
        <div className='flex-1 text-xl font-semibold'>Frames</div>

        <div
          className=' cursor-pointer group'
          onClick={() => {
            setLeftSideBarType("");
          }}
        >
          <CloseIcon className='w-6 h-6 text-gray-800 transition-all group-hover:text-blue-600' />
        </div>
      </div>
      <div className='flex items-center space-x-2 px-5'>
        <div className='flex-1 text-white flex items-center justify-center bg-blue-600 py-3 space-x-4 rounded cursor-pointer hover:bg-blue-700 transition-all'>
          <VideoPlayIcon className='w-3 h-3' />
          <span className=''>Present</span>
        </div>
        <div
          className='px-2  cursor-pointer group '
          onClick={() => {
            if (styleListShow === "normal") {
              setStyleListShow("short");
            } else {
              setStyleListShow("normal");
            }
          }}
        >
          {styleListShow === "short" ? (
            <ListIcon className='w-5 h-5 text-gray-800 transition-all group-hover:text-blue-600' />
          ) : (
            <LayerIcon className='w-5 h-5 text-gray-800 transition-all group-hover:text-blue-600' />
          )}
        </div>
      </div>
      <div className='flex-1 overflow-y-auto flex flex-col space-y-3 pb-3 pr-3 pl-5 pt-2'>
        {frameList.map((_, index) => {
          return (
            <FrameItem
              key={index}
              index={index}
              active={activeFrameIndex === index}
              setActive={() => setActiveFrameIndex(index)}
              styleListShow={styleListShow}
            />
          );
        })}
        <div className='py-2 flex justify-center'>
          <div className=' group h-10 w-10 flex justify-center items-center bg-gray-200 rounded-full cursor-pointer transition-all hover:bg-gray-300 '>
            <PlusIcon className='w-5 h-5 text-gray-800 group-hover:text-blue-600' />
          </div>
        </div>
      </div>
    </div>
  );
}
