import React from 'react';
import {
  BellIcon,
  ChatIcon,
  CursorIcon,
  DownArrowIcon,
  PeopleIcon,
  ReactionIcon,
} from '../svgs';
import usePaperStore from '@/store/paper_store';
import useDrawnStore from '@/store/drawn_object_store';
import { fabric } from 'fabric';
import { Frame } from '@/utils/customFabricClass';
import MemberCircleList from './topRightMenu/MemberCircleList';

type Props = {};

export default function TopRightMenu({}: Props) {
  const paperStore = usePaperStore();

  

  return (
    <div className=" bg-white rounded-md shadow-lg pointer-events-auto">
      <div className="h-11 flex items-center">
        <div
          className={`ct-menu-item ${paperStore.showCursorPartner && 'active'}`}
          onClick={() => {
            paperStore.setShowCursorPartner(!paperStore.showCursorPartner);
          }}
        >
          <CursorIcon className="ct-menu-icon" />
        </div>
        <div className="ct-menu-item">
          <ReactionIcon className="ct-menu-icon" />
        </div>
        <div
          className={`ct-menu-item ${
            paperStore.rightSideBarType === 'comment' && 'active'
          }`}
          onClick={() => {
            paperStore.setRightSideBarType('comment');
          }}
        >
          <ChatIcon className="ct-menu-icon" />
        </div>
        <MemberCircleList className="h-10 flex items-center justify-center cursor-pointer space-x-1" />
        <div
          className={`ct-menu-item ${
            paperStore.rightSideBarType === 'message' && 'active'
          }`}
          onClick={() => {
            paperStore.setRightSideBarType('message');
          }}
        >
          <BellIcon className="ct-menu-icon" />
        </div>

        {/* button */}
        <div className="flex items-center h-7 bg-gray-100 rounded cursor-pointer transition-all">
          <div
            className="text-xs font-semibold flex items-center px-3  h-full text-gray-800 border-r border-gray-200
            hover:bg-gray-200 rounded-l
          "
          >
            Present
          </div>
          <div className="px-2 hover:bg-gray-200 h-full flex items-center rounded-r">
            <DownArrowIcon className="w-4 h-4 text-gray-800" />
          </div>
        </div>
        <div className="mx-2 flex items-center bg-blue-600 text-white  h-7 px-3 rounded cursor-pointer hover:bg-blue-700 transition-all">
          <PeopleIcon className="w-4 h-4 " />
          <div className="text-xs pl-1 font-semibold">Share</div>
        </div>
      </div>
    </div>
  );
}
