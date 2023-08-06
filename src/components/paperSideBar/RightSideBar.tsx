import React from 'react';
import ScaleMenu from './ScaleMenu';
import usePaperStore from '@/store/paper_store';
import CommentList from './CommentList';
import MessageList from './MessageList';

type Props = {};

export default function RightSideBar({}: Props) {
  const { rightSideBarType } = usePaperStore();

  let bodyContent = <></>;
  if (rightSideBarType === 'comment') {
    bodyContent = <CommentList />;
  }
  if (rightSideBarType === 'message') {
    bodyContent = <MessageList />;
  }

  return (
    <div
      className={`absolute right-2 pointer-events-none bottom-2 top-14 mt-1 flex  transition-all duration-300 z-40  ${
        !rightSideBarType && 'translate-x-[348px]'
      }`}
    >
      <div className="mr-2 pointer-events-auto mt-auto">
        <ScaleMenu />
      </div>
      <div className="w-[340px] bg-white rounded-md shadow-lg pointer-events-auto flex flex-col ">
        {bodyContent}
      </div>
    </div>
  );
}
