import usePaperStore from '@/store/paper_store';
import { memberColors } from '@/utils/constans';
import React from 'react';

type Props = {
  className: string;
};

export default function MemberCircleList({ className }: Props) {
  const { memberOnlineList } = usePaperStore();

  return (
    <div className={className}>
      {memberOnlineList.map((item, index) => {
        return (
          <div
            key={index}
            className="h-7 w-7 flex justify-center items-center rounded-full  border-2 text-xs font-semibold"
            style={{
              backgroundColor: memberColors[index % 20].backgroundColor,
              color: memberColors[index % 20].textColor,
              borderColor: memberColors[(index + 10) % 20].backgroundColor,
            }}
          >
            H
          </div>
        );
      })}
    </div>
  );
}
