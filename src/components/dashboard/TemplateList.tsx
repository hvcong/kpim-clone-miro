/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

export default function TemplateList({}: Props) {
  const router = useRouter();
  return (
    <div className="mt-6">
      <div className="my-4">
        <h1 className="text-3xl font-semibold">Create a paper</h1>
      </div>
      <div className="bg-white rounded-md p-3">
        <div className="flex justify-between pb-2">
          <p className="font-semibold text-gray-700">Recommended templates</p>
          <Link href="#" className="text-xs text-blue-500 hover:text-blue-600">
            Show All
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4  lg:grid-cols-6 xl:grid-cols-7">
          <div
            className="group  flex-1  cursor-pointer"
            onClick={() => {
              router.push('/paper');
            }}
          >
            <div className=" group w-full h-20 text-5xl flex justify-center items-center text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all">
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </div>
            <div className="text-xs pt-1 font-semibold text-gray-600 group-hover:text-blue-500 transition-all">
              New paper
            </div>
          </div>
          {/* item */}
          {Array(6)
            .fill(null)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className={`group cursor-pointer 
                  ${index === 2 && 'hidden sm:block'} 
                  
                  ${index === 3 && 'hidden lg:block'} 
                  ${index === 4 && 'hidden lg:block'}
                  ${index === 5 && 'hidden xl:block'} 
                  `}
                >
                  <div className="w-full h-20">
                    <img
                      alt="thumb"
                      src="/thumb.png"
                      className="rounded-md w-full h-full border group-hover:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="text-xs pt-1 font-semibold text-gray-600 group-hover:text-blue-500 transition-all">
                    template {index}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
