import { RestoreIcon } from '@/components/svgs';
import { DrawnObject, CanvasObjectType } from '@/types/types';
import {
  generateColorFromUUID,
  mysqlDateToJs,
  sqlDateToHHmm,
  sqlToHHmmDDmmYYYY,
} from '@/utils';
import React from 'react';

type Props = {
  data: DrawnObject;
  siblingData: DrawnObject | null;
};

export default function HistotyItem({ data, siblingData }: Props) {
  let username = data.ChangeLog.User.username;
  let changeLogType = data.ChangeLog.type;
  let updatedAt = data.ChangeLog.updatedAt;
  let drawnObjValue = JSON.parse(data.value) as CanvasObjectType;
  let drawnObjType = drawnObjValue.type;
  let color = generateColorFromUUID(data.ChangeLog.User.id);

  return (
    <>
      {/* <div className="text-center uppercase font-bold text-xs text-gray-600 mb-2">
        Today
      </div> */}

      {siblingData === null && (
        <div className="flex items-center my-1">
          <div
            className="h-5 w-5 flex justify-center items-center rounded-full text-xs text-center"
            style={{
              backgroundColor: color.backgroundColor,
              color: color.textColor,
            }}
          >
            {username.charAt(0)}
          </div>
          <div className="font-semibold text-gray-600 ml-2 text-sm">
            {username}
          </div>
        </div>
      )}

      {siblingData &&
        siblingData.ChangeLog.UserId !== data.ChangeLog.UserId && (
          <div className="flex items-center my-1">
            <div
              className="h-5 w-5 flex justify-center items-center rounded-full text-xs text-center"
              style={{
                backgroundColor: color.backgroundColor,
                color: color.textColor,
              }}
            >
              {username.charAt(0)}
            </div>
            <div className="font-semibold text-gray-600 ml-2 text-sm">
              {username}
            </div>
          </div>
        )}

      <div className="flex justify-between text-gray-500  py-0.5 pl-6 hover:bg-gray-200 rounded px-2 transition-all cursor-pointer text-xs">
        <div className="">
          <div className="font-semibold">
            {changeLogType + ' ' + drawnObjType}
          </div>
          {drawnObjType === 'frame' && (
            <div className="text italic border-l-2 border-gray-300 px-2 my-1">
              {drawnObjType}
            </div>
          )}
        </div>
        <div className="text-xs flex py-1 ">
          {changeLogType === 'delete' && (
            <div className="px-2">
              <RestoreIcon className=" text-gray-500 h-4 w-4 hover:text-blue-600" />
            </div>
          )}
          {sqlDateToHHmm(updatedAt)}
        </div>
      </div>
    </>
  );
}
