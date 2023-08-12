import React from 'react';
import { LogoutIcon, SettingIcon } from '../svgs';
import useAuthStore from '@/store/auth_store';
import { useEffect } from 'react';
import { useRef } from 'react';

type Props = {
  className: string;
  close: () => void;
};

export default function AccountDropDown({ className, close }: Props) {
  const { logOut } = useAuthStore();
  const { user } = useAuthStore();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function clickOut({ target }: MouseEvent) {
      if (!containerRef?.current?.contains(target as HTMLElement)) {
        close();
      }
    }
    window.addEventListener('click', clickOut);

    return () => {
      window.removeEventListener('click', clickOut);
    };
  }, []);

  return (
    <div className={className} ref={containerRef}>
      <div className="flex flex-col p-6 space-y-3 text-gray-600 cursor-default">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex justify-center items-center text-white">
            {user?.username?.charAt(0)?.toUpperCase() ||
              user?.email?.charAt(0)?.toUpperCase()}
          </div>
          <div className="ml-3">
            <div className="font-semibold text-gray-800 text-base">hvcong</div>
            <div className="">hvcong.hv@kpim.vn</div>
          </div>
        </div>
        <div className=" group flex space-x-2 items-center cursor-pointer ">
          <div className="w-8 flex justify-center">
            <SettingIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-all duration-75" />
          </div>
          <div className="transition-all group-hover:text-blue-600 duration-75">
            Settings
          </div>
        </div>
        <div
          className=" group flex space-x-2 items-center cursor-pointer transition-all hover:text-blue-600"
          onClick={() => {
            logOut();
          }}
        >
          <div className="w-8 flex justify-center">
            <LogoutIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-all duration-75" />
          </div>
          <div className="transition-all group-hover:text-blue-600 duration-75">
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}
