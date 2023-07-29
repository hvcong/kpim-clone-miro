import usePaperStore from "@/store/paper_store";
import React, { useRef } from "react";

type Props = {};

export default function ScaleMenu({}: Props) {
  const { scale, setScale, canvas } = usePaperStore();

  return (
    <div className='absolute flex right-2 bottom-2 bg-white rounded-md shadow-lg'>
      <div className='ct-menu-item'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          className='ct-menu-icon'
          aria-hidden='true'
          role='presentation'
          focusable='false'
          data-testid='svg-icon'
        >
          <path fill='currentColor' d='M18 13H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z'></path>
        </svg>
      </div>
      <div
        className='ct-menu-item'
        onClick={() => {
          if (canvas) {
            setScale(1, window.innerWidth / 2, window.innerHeight / 2);
          }
        }}
      >
        <span className='badgeWrapper-JH8OK badge-2YEHI badgeSize-1YLGO'>
          <span className='ct-menu-icon text-xs'>{Math.floor(scale * 100)}%</span>
        </span>
      </div>
      <div className='ct-menu-item'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
          className='ct-menu-icon'
          aria-hidden='true'
          role='presentation'
          focusable='false'
          data-testid='svg-icon'
        >
          <path
            fill='currentColor'
            d='M18 13h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5V6a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z'
          ></path>
        </svg>
      </div>
    </div>
  );
}
