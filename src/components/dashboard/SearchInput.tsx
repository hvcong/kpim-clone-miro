'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

type Props = {};

const paperList = [
  {
    id: 1,
    name: 'board 1',
  },
  {
    id: 2,
    name: 'board 2',
  },
  {
    id: 3,
    name: 'board 3',
  },
];

export default function SearchInput({}: Props) {
  const [input, setInput] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [paperId, setPaperId] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // hide dropdown when click outside
  useEffect(() => {
    function clickOut({ target }: MouseEvent) {
      if (!containerRef?.current?.contains(target as HTMLElement)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      window.addEventListener('click', clickOut);
    }

    return () => {
      window.removeEventListener('click', clickOut);
    };
  }, [showDropdown]);

  // event ctrl + F
  useEffect(() => {
    function focusSearchInput(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() == 'f') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', focusSearchInput);

    return () => {
      document.removeEventListener('keydown', focusSearchInput);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 rounded-md">
      <div className="flex bg-white px-3 py-2 justify-center items-center rounded-t-sm relative max-w-sm">
        <svg
          className="w-3 h-3 text-gray-700 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          value={input}
          ref={inputRef}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onFocus={() => {
            setShowDropdown(true);
          }}
          className="peer flex-1 mx-3 outline-none text-xs placeholder:text-xs"
          placeholder="Search boards"
        />
        <span className="text-xs text-gray-700 transition-all hidden peer-hover:block peer-focus:hidden ">
          Ctrl+F
        </span>

        <svg
          className={`w-3 h-3 text-gray-700 cursor-pointer ${
            !input && 'hidden'
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          onClick={() => {
            setInput('');
          }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>

        {/* dropdown */}
        <div
          className={`h-0 overflow-hidden transition-all duration-300 absolute left-0 right-0 top-full bg-white rounded-b-sm drop-shadow-md z-40
            flex
          ${showDropdown && 'h-auto'}`}
          onMouseLeave={() => {
            if (paperId != -1) {
              setPaperId(-1);
            }
          }}
        >
          <div className=" border-t border-r flex-1  p-3">
            <p className="uppercase text-xs text-gray-500 mb-2 ">
              Recent boards
            </p>
            <div>
              {paperList.map((paper) => {
                const { id } = paper;
                return (
                  <div
                    className="flex items-center transition-all px-0.5 py-1 hover:bg-gray-200 rounded-md cursor-pointer min-w-[150px]"
                    key={id}
                    onMouseMove={() => {
                      if (paperId != id) {
                        setPaperId(id);
                      }
                    }}
                  >
                    <Image
                      src="/board_icon.png"
                      className="w-6 h-6 rounded-md"
                      width={24}
                      height={24}
                      alt="image"
                    />
                    <p className="text-xs pl-3">name paper</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* drop right side */}
          <div
            className={`w-0 overflow-hidden transition-all duration-300 ${
              paperId != -1 && 'w-52'
            }`}
          >
            {paperId != -1 && <PaperDetail paperId={paperId} />}
          </div>
        </div>
      </div>
    </div>
  );
}

type PaperDetailPropsType = {
  paperId: number;
};

function PaperDetail({ paperId }: PaperDetailPropsType) {
  return (
    <div className="p-2 flex flex-col">
      <div className=""></div>
      <div className="flex justify-center">
        <Image
          alt="paper image"
          src="/board_icon.png"
          width={160}
          height={160}
        />
      </div>
      <h2>paper id: {paperId}</h2>
    </div>
  );
}
