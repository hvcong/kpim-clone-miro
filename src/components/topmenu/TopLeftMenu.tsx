import React, { useState } from 'react';
import { ExportIcon, LogoIcon, SettingIcon } from '../svgs';
import usePaperStore from '@/store/paper_store';
import { useRouter } from 'next/router';

type Props = {};

export default function TopLeftMenu({}: Props) {
  const { setShowPaperDetailModal } = usePaperStore();
  const router = useRouter();

  return (
    <div className="pointer-events-auto h-full">
      <div className="bg-white h-full flex justify-center items-center rounded-md shadow-lg mr-2 ">
        <div
          className="group h-10 px-3 mx-0.5 hover:bg-blue-100 rounded-md transition-all cursor-pointer"
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          <LogoIcon className="h-full w-16 group-hover:text-blue-600" />
        </div>
        <div className="border-l border-gray-300 h-5"></div>
        <div
          onClick={(e) => {
            setShowPaperDetailModal(true);
          }}
          className="group rounded-md hover:bg-blue-100 flex h-10 flex-shrink justify-center items-center px-3 mx-0.5 hover:text-blue-600 transition-all cursor-pointer
            font-semibold 
          "
        >
          <div className="">filenameasdfasdfa</div>
        </div>
        <div className="border-l border-gray-300 h-5"></div>
        <div className="group  rounded-md hover:bg-blue-100 h-10 flex justify-center items-center px-3 mx-0.5 transition-all cursor-pointer">
          <SettingIcon className="group-hover:text-blue-600" />
        </div>
        <div className="group  rounded-md hover:bg-blue-100 h-10 flex justify-center items-center px-3 mx-0.5 transition-all cursor-pointer">
          <ExportIcon className="group-hover:text-blue-600" />
        </div>
      </div>
    </div>
  );
}
