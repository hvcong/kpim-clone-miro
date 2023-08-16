import React from 'react';
import { CloseIcon, RestoreIcon } from '../../svgs';
import usePaperStore from '@/store/paper_store';
import useDrawnStore from '@/store/drawn_object_store';
import HistotyItem from './HistotyItem';

type Props = {};

export default function HistoryList({}: Props) {
  const { setLeftSideBarType } = usePaperStore();

  const { drawnObjList } = useDrawnStore();

  let _listSortedWithUpdatedAt = drawnObjList
    .sort((a, b) => {
      let date1 = new Date(a.ChangeLog.updatedAt);
      let date2 = new Date(b.ChangeLog.updatedAt);
      if (date1 > date2) return 1;
      else if (date1 < date2) return -1;
      else return 0;
    })
    .reverse();

  return (
    <div className="space-y-3 flex-1 overflow-y-hidden flex flex-col text-sm">
      <div className="flex py-3 items-center space-x-3 px-5 border-b border-gray-300">
        <div className="flex-1 text-xl font-semibold">Paper history</div>

        <div
          className=" cursor-pointer group"
          onClick={() => {
            setLeftSideBarType('');
          }}
        >
          <CloseIcon className="w-6 h-6 text-gray-800 group-hover:text-blue-600 transition-all" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col   pb-3 pr-3 pl-3">
        {_listSortedWithUpdatedAt.map((item, index, list) => {
          return (
            <HistotyItem
              key={index}
              data={item}
              siblingData={index === 0 ? null : list[index - 1]}
            />
          );
        })}
      </div>
    </div>
  );
}
