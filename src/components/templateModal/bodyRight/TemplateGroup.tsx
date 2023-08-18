import React from 'react';
import TemplateItem from './TemplateItem';
import { TemplateType } from '@/types/types';

type Props = {
  className: string;
  title: string;
  list: TemplateType[];
};

export default function TemplateGroup({ className, title, list }: Props) {
  return (
    <div className={className}>
      <div className="">
        <div className="flex justify-between py-4 items-end">
          <div className="text-3xl  text-gray-800 ">{title}</div>
          <p className=" underline decoration-1  underline-offset-8 decoration-dashed decoration-gray-500 cursor-pointer">
            See all
          </p>
        </div>
        {list.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {list.map((item) => {
              return <TemplateItem key={item.id} data={item} />;
            })}
          </div>
        ) : (
          <div className="">empty</div>
        )}
      </div>
    </div>
  );
}
