/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { StartIcon } from '../svgs';
import { useQuery } from 'react-query';
import paperApi from '@/api/paperApi';
import useAuthStore from '@/store/auth_store';
import { useRouter } from 'next/router';

type Props = {};

async function getPaperList() {
  return paperApi.getList();
}

export default function PaperList({}: Props) {
  const { data } = useQuery('paper_list', getPaperList);
  const { user } = useAuthStore();
  const router = useRouter();

  let paperList = data?.data.paperList || [];
  return (
    <div className="mt-8 ">
      <div className="my-4">
        <h1 className="text-3xl font-semibold">My papers</h1>
      </div>
      {/* paper list */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {paperList.map((paper) => {
          const role = paper.Paper_Users.find(
            (item) => item.UserId === user?.id,
          )?.role;
          return (
            <div
              key={paper.id}
              className="h-80 cursor-pointer  flex flex-col"
              onClick={() => {
                router.push('/paper/' + paper.id);
              }}
            >
              <div className="relative flex-1">
                <div className="">
                  <img
                    src="/board_icon.png"
                    alt="paper thumb"
                    className="w-full h-full absolute top-0 left-0 right-0 bottom-0 rounded-t-md"
                  />
                </div>
                <div className="peer group rounded-t-md h-full w-full z-10 relative bg-black/[.5] opacity-0 hover:opacity-100 transition-all">
                  <svg
                    className="w-5 h-5 text-gray-300 absolute right-4 top-3 hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </div>
                {role === 'read' && (
                  <span className="peer-hover:opacity-0 flex absolute top-4 left-4 px-1 text-white bg-gray-500 text-xs font-semibold rounded-sm transition-all">
                    VIEW-ONLY
                  </span>
                )}
                {role === 'comment' && (
                  <span className="peer-hover:opacity-0 flex absolute top-4 left-4 px-1 text-white bg-gray-500 text-xs font-semibold rounded-sm transition-all">
                    COMMENT-ONLY
                  </span>
                )}
              </div>
              <div className="bg-white p-3 flex rounded-b-md">
                <div className="flex-1">
                  <p>{paper.name}</p>
                  <div className="flex pr-4">
                    <span className="text-xs text-gray-400 line-clamp-1 h-4">
                      Modified by Hooàng Văn Công
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      , Jul 19
                    </span>
                  </div>
                </div>
                <div>
                  <StartIcon className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
