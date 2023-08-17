import React from 'react';
import TemplateItem from './TemplateItem';

type Props = {
  className: string;
  title: string;
};

export default function TemplateGroup({ className, title }: Props) {
  return (
    <div className={className}>
      <div className="">
        <div className="flex justify-between py-4 items-end">
          <div className="text-3xl  text-gray-800 ">{title}</div>
          <p className=" underline decoration-1  underline-offset-8 decoration-dashed decoration-gray-500 cursor-pointer">
            See all
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TemplateItem />
          <TemplateItem />
          <TemplateItem />
          <TemplateItem />
        </div>
      </div>
    </div>
  );
}
