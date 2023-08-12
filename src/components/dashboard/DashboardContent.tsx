import React, { useState } from 'react';
import SearchInput from './SearchInput';
import MessagesSideModal from './MessagesSideModal';
import TemplateList from './TemplateList';
import PaperList from './PaperList';
import AccountDropDown from './AccountDropDown';
import useAuthStore from '@/store/auth_store';

type Props = {};

export default function DashboardContent({}: Props) {
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const { user } = useAuthStore();
  const [showAccountDropDown, setShowAccountDropDown] = useState(false);

  return (
    <div className="flex-1 cursor-default h-screen w-full overflow-x-hidden overflow-y-hidden ">
      {/* header */}

      <div className="my-4 flex pr-5">
        <SearchInput />
        <div className="group flex items-center justify-center px-4 cursor-pointer">
          <svg
            className="w-5 h-5 text-gray-700 group-hover:text-blue-500"
            onClick={() => setShowMessages(true)}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 21"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"
            />
          </svg>
        </div>
        <div className="relative flex transition-all items-center justify-center bg-gray-400 w-8 h-8 rounded-full cursor-pointer select-none">
          <div
            className="w-8 h-8 rounded-full bg-gray-600 flex justify-center items-center text-white "
            onClick={(e) => {
              setShowAccountDropDown(!showAccountDropDown);
              e.stopPropagation();
            }}
          >
            {user?.username?.charAt(0)?.toUpperCase() ||
              user?.email?.charAt(0)?.toUpperCase()}
          </div>
          {showAccountDropDown && (
            <AccountDropDown
              close={() => {
                setShowAccountDropDown(false);
              }}
              className="absolute top-full translate-y-3 right-0.5 bg-white shadow-lg rounded min-w-[300px] z-20"
            />
          )}
        </div>
      </div>
      {/* body */}
      <div className="h-full overflow-y-auto pr-2 pb-24">
        <TemplateList />
        <PaperList />
      </div>
      <MessagesSideModal show={showMessages} setShow={setShowMessages} />
    </div>
  );
}
