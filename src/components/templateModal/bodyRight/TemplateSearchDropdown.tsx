import { WatchIcon } from '@/components/svgs';
import React from 'react';

type Props = {
  className: string;
};

export default function TemplateSearchDropdown({ className }: Props) {
  return (
    <div className={className}>
      <div className="bg-white px-2 py-4">
        <div className="text-xs text-gray-600 px-1 pb-3">RECENT</div>
        <div className="">
          <div className="px-3 space-x-3 py-2.5 hover:bg-gray-200 transition-all flex items-center rounded">
            <div className="">
              <WatchIcon className="w-5 h-5 text-gray-700" />
            </div>
            <div className=""> template with big heart</div>
          </div>
          <div className="px-3 space-x-3 py-2.5 hover:bg-gray-200 transition-all flex items-center rounded">
            <div className="">
              <WatchIcon className="w-5 h-5 text-gray-700" />
            </div>
            <div className="flex items-center"> template with big heart</div>
          </div>
          <div className="px-3 space-x-3 py-2.5 hover:bg-gray-200 transition-all flex items-center rounded">
            <div className="">
              <WatchIcon className="w-5 h-5 text-gray-700" />
            </div>
            <div className=""> template with big heart</div>
          </div>
        </div>
      </div>
    </div>
  );
}
