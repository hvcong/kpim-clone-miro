import React from 'react';
import ScaleMenu from './ScaleMenu';
import usePaperStore from '@/store/paper_store';
import CommentList from './CommentList';
import MessageList from './MessageList';
import LeftMenuList from './LeftMenuList';
import { FrameIcon, HistoryIcon } from '../svgs';
import FrameList from './FrameList';
import HistoryList from './HistoryList';

type Props = {};

export default function LeftSideBar({}: Props) {
  const { leftSideBarType, setLeftSideBarType } = usePaperStore();

  function renderBody() {
    if (leftSideBarType === 'frame') {
      return <FrameList />;
    } else if (leftSideBarType === 'history') {
      return <HistoryList />;
    }
    return null;
  }

  return (
    <div
      className={`absolute left-2 pointer-events-none bottom-2 top-14 mt-1 flex  transition-all duration-300 z-40  ${
        !leftSideBarType && '-translate-x-[348px]'
      }`}
    >
      <div className="w-[340px] bg-white rounded-md shadow-lg pointer-events-auto flex flex-col">
        <div className="flex-1 flex flex-col overflow-y-hidden">
          <div className="flex-1 overflow-y-hidden flex flex-col">
            {renderBody()}
          </div>
        </div>
        <div className="flex relative mx-3">
          <div
            className={`absolute top-0 h-0.5 bg-blue-600 transition-all duration-500 ${
              leftSideBarType === 'frame'
                ? 'left-0 right-1/2'
                : 'left-1/2 right-0'
            }`}
          ></div>
          <div
            className={`group flex-1 flex justify-center py-3 cursor-pointer transition-all border-t-2 border-gray-200 `}
            onClick={() => {
              setLeftSideBarType('frame');
            }}
          >
            <FrameIcon
              className={`w-6 h-6  group-hover:text-blue-600 ${
                leftSideBarType === 'frame' ? 'text-blue-600' : 'text-gray-800'
              }`}
            />
          </div>
          <div
            className={`group flex-1 flex justify-center py-3 cursor-pointer transition-all border-t-2 border-gray-200 `}
            onClick={() => {
              setLeftSideBarType('history');
            }}
          >
            <HistoryIcon
              className={`w-6 h-6  group-hover:text-blue-600 ${
                leftSideBarType === 'history'
                  ? 'text-blue-600'
                  : 'text-gray-800'
              }`}
            />
          </div>
        </div>
      </div>
      <div className="ml-2 pointer-events-auto mt-auto shadow-lg ">
        <LeftMenuList />
      </div>
    </div>
  );
}
