import React from "react";
import { CloseIcon, FillIcon } from "../svgs";
import usePaperStore from "@/store/paper_store";

type Props = {};

export default function MessageList({}: Props) {
  const { setRightSideBarType } = usePaperStore();
  return (
    <div className=' space-y-3 flex-1 flex flex-col overflow-hidden'>
      <div className='flex py-3 items-center space-x-3 px-5 border-b border-gray-300'>
        <div className='flex-1 text-xl font-semibold'>Messages</div>
        <div className=' cursor-pointer group'>
          <FillIcon className='w-6 h-6 text-gray-800 transition-all group-hover:text-blue-600' />
        </div>
        <div
          className=' cursor-pointer group'
          onClick={() => {
            setRightSideBarType("");
          }}
        >
          <CloseIcon className='w-6 h-6 text-gray-800 transition-all group-hover:text-blue-600' />
        </div>
      </div>

      {/* message list */}
      <div className='flex-1 flex flex-col space-y-4 px-4 pb-12 cursor-default  overflow-y-auto'>
        {Array(5)
          .fill(null)
          .map((_, index) => {
            return (
              <div key={index} className=''>
                <h6 className='py-3 text-sm'>aaaa</h6>
                <div className='p-3 rounded-md border-gray-300 border hover:shadow-md transition-all'>
                  <div className=''>
                    <span className=''>
                      <b>Hoang van cong</b> invited you to edit
                    </span>
                  </div>
                  <div className='flex justify-between mt-4 items-end'>
                    <div className=' flex py-1.5 px-3 rounded text-white bg-blue-600 text-xs transition-all justify-center items-end cursor-pointer hover:bg-blue-700'>
                      Go to paper
                    </div>
                    <span className='text-gray-400'>2d</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
