import React, { useEffect, useRef, useState } from "react";
import { CloseIcon, DownArrowIcon, ThreeDotsIcon } from "../svgs";
import usePaperStore from "@/store/paper_store";

type Props = {};

const list = Array(9).fill(null);
export default function CommentList({}: Props) {
  const { setRightSideBarType } = usePaperStore();

  const [fill, setFill] = useState<"all" | "mention">("all");
  const [showFillSelect, setShowFillSelect] = useState(false);

  const fillSelectPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeSelectWhenClickOutSide(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!fillSelectPopupRef.current?.contains(target)) {
        setShowFillSelect(false);
      }
    }
    if (showFillSelect) {
      document.addEventListener("click", closeSelectWhenClickOutSide);
    }
    return () => {
      if (showFillSelect) {
        document.removeEventListener("click", closeSelectWhenClickOutSide);
      }
    };
  }, [showFillSelect]);

  return (
    <div className='space-y-3 flex-1 overflow-hidden flex flex-col'>
      <div className='flex py-3 items-center space-x-3 px-5 border-b border-gray-300'>
        <div className='flex-1 text-xl font-semibold'>Comments</div>
        <div className=' cursor-pointer group'>
          <ThreeDotsIcon className='w-6 h-6 text-gray-800 tranition-all group-hover:text-blue-600' />
        </div>
        <div
          className=' cursor-pointer group'
          onClick={() => {
            setRightSideBarType("");
          }}
        >
          <CloseIcon className='w-6 h-6 text-gray-800 tranition-all group-hover:text-blue-600' />
        </div>
      </div>
      <div className='flex items-center px-5'>
        <div className='text-sm text-gray-600'>Show:</div>
        <div className='relative '>
          <div
            className='flex ml-3 items-center py-1 px-2 hover:bg-gray-200 transition-all rounded-md'
            onClick={(e) => {
              setShowFillSelect(true);
              // prevent match event click outside of select container
              e.stopPropagation();
            }}
          >
            <span>All comments</span>
            <div className='flex items-center ml-1'>
              <DownArrowIcon className='w-5 h-5 text-gray-600' />
            </div>
          </div>
          {showFillSelect && (
            <div
              ref={fillSelectPopupRef}
              className='absolute bg-white shadow-lg p-3 rounded-sm top-full left-0 border translate-y-0.5'
            >
              <div className='group flex items-center text-sm space-x-6 px-4 py-2  rounded-sm hover:bg-blue-100 transition-all'>
                <p className=' flex-1 whitespace-nowrap group-hover:text-blue-600'>All comments</p>
                <input type='radio' defaultChecked name='type' />
              </div>
              <div className='group flex items-center text-sm space-x-6 px-4 py-2  rounded-sm hover:bg-blue-100 transition-all'>
                <p className=' flex-1 whitespace-nowrap group-hover:text-blue-600'>Metions</p>
                <input type='radio' name='type' />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex-1  text-sm text-gray-700 px-5 space-y-2 pb-3 overflow-y-auto pointer-events-auto'>
        {list?.map((_, index) => {
          return (
            <div
              key={index}
              className='rounded-md border border-gray-300 p-3 hover:bg-gray-200 flex transition-all cursor-pointer'
            >
              <div className='flex items-center'>
                <div className='h-6 w-6 bg-orange-700 rounded-full text-white flex justify-center items-center text-xs'>
                  H
                </div>
              </div>
              <div className='flex-1 px-2'>
                <div className='font-semibold pb-1'>hvcong</div>
                <div className=''>comment</div>
              </div>
              <div className=''>today</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
