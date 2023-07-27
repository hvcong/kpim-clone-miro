/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {};

export default function PaperList({}: Props) {
  return (
    <div className='mt-8 '>
      <div className='my-4'>
        <h1 className='text-3xl font-semibold'>My papers</h1>
      </div>
      {/* paper list */}
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4'>
        {Array(10)
          .fill(null)
          .map((_, index) => {
            return (
              <div key={index} className='h-80 cursor-pointer  flex flex-col'>
                <div className='relative flex-1'>
                  <div className=''>
                    <img
                      src='/board_icon.png'
                      alt='paper thumb'
                      className='w-full h-full absolute top-0 left-0 right-0 bottom-0 rounded-t-md'
                    />
                  </div>
                  <div className='peer group rounded-t-md h-full w-full z-10 relative bg-black/[.5] opacity-0 hover:opacity-100 transition-all'>
                    <svg
                      className='w-5 h-5 text-gray-300 absolute right-4 top-3 hover:text-white'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 16 3'
                    >
                      <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                    </svg>
                  </div>
                  <span className='peer-hover:opacity-0 flex absolute top-4 left-4 px-1 text-white bg-gray-500 text-xs font-semibold rounded-sm transition-all'>
                    VIEW-ONLY
                  </span>
                </div>
                <div className='bg-white p-3 flex rounded-b-md'>
                  <div className='flex-1'>
                    <p>paper name</p>
                    <div className='flex pr-4'>
                      <span className='text-xs text-gray-400 line-clamp-1 h-4'>
                        Modified by Hooàng Văn Công
                      </span>
                      <span className='text-xs text-gray-400 whitespace-nowrap'>, Jul 19</span>
                    </div>
                  </div>
                  <div>
                    <svg
                      className='w-5 h-5 text-gray-400 hover:text-blue-500'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 21 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
