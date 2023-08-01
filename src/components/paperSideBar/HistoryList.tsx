import React from "react";
import { CloseIcon, RestoreIcon } from "../svgs";
import usePaperStore from "@/store/paper_store";

type Props = {};

export default function HistoryList({}: Props) {
  const { setLeftSideBarType } = usePaperStore();
  return (
    <div className='space-y-3 flex-1 overflow-y-hidden flex flex-col text-sm'>
      <div className='flex py-3 items-center space-x-3 px-5 border-b border-gray-300'>
        <div className='flex-1 text-xl font-semibold'>Paper history</div>

        <div
          className=' cursor-pointer group'
          onClick={() => {
            setLeftSideBarType("");
          }}
        >
          <CloseIcon className='w-6 h-6 text-gray-800 group-hover:text-blue-600 transition-all' />
        </div>
      </div>

      <div className='flex-1 overflow-y-auto flex flex-col   pb-3 pr-3 pl-3'>
        <div className='text-center uppercase font-bold text-xs text-gray-600 mb-2'>Today</div>
        <div className='flex items-center my-1'>
          <div className='h-5 w-5 flex justify-center items-center bg-orange-700 rounded-full text-xs text-white text-center'>
            H
          </div>
          <div className='font-semibold text-gray-700 ml-2'>Hoàng Văn Công</div>
        </div>

        <div className='flex justify-between text-gray-600  py-0.5 pl-6 hover:bg-gray-200 rounded px-2 transition-all cursor-pointer'>
          <div className=''>
            <div className='font-semibold'>added frame</div>
            <div className='text italic border-l-2 border-gray-300 px-2 my-1'>Frame 4</div>
          </div>
          <div className='text-xs flex py-1 '>
            <div className='px-2'>
              <RestoreIcon className=' text-gray-500 h-4 w-4 hover:text-blue-600' />
            </div>
            11:59
          </div>
        </div>
        <div className='text-center uppercase font-bold text-xs text-gray-600 mb-2'>Today</div>
      </div>
    </div>
  );
}
