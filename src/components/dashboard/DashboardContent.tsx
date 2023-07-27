import React, { useState } from "react";
import SearchInput from "./SearchInput";
import MessagesSideModal from "./MessagesSideModal";
import TemplateList from "./TemplateList";
import PaperList from "./PaperList";

type Props = {};

export default function DashboardContent({}: Props) {
  const [showMessages, setShowMessages] = useState<boolean>(false);

  return (
    <div className='flex-1 cursor-default h-screen w-full overflow-x-hidden overflow-y-hidden '>
      {/* header */}

      <div className='my-4 flex pr-5'>
        <SearchInput />
        <div className='group flex items-center justify-center px-4 cursor-pointer'>
          <svg
            className='w-5 h-5 text-gray-700 group-hover:text-blue-500'
            onClick={() => setShowMessages(true)}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 16 21'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z'
            />
          </svg>
        </div>
        <div className='flex transition-all items-center justify-center bg-gray-400 w-8 h-8 rounded-full cursor-pointer'>
          <svg
            className='w-4 h-4 text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 18'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z'
            />
          </svg>
        </div>
      </div>
      {/* body */}
      <div className='h-full overflow-y-auto pr-2 pb-24'>
        <TemplateList />
        <PaperList />
      </div>
      <MessagesSideModal show={showMessages} setShow={setShowMessages} />
    </div>
  );
}
