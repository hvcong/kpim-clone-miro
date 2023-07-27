import React from 'react';

type Props = {};

export default function Undo({}: Props) {
  return (
    <div className="flex flex-col bg-white rounded-md mt-2 shadow-lg">
      <div className={`ct-menu-item`}>
        <span className="badgeWrapper-JH8OK badge-2YEHI badgeSize-1YLGO">
          <svg
            viewBox="0 0 24 24"
            className="ct-menu-icon"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            data-testid="svg-icon"
          >
            <g
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="currentColor"
              fillRule="evenodd"
              fill="none"
            >
              <path d="M5 14.5C8.5 8 17.5 8 20 15M9.018 15H4l.018-5"></path>
            </g>
          </svg>
        </span>
      </div>
      <div className={`ct-menu-item`}>
        <svg
          viewBox="0 0 24 24"
          className="ct-menu-icon"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          data-testid="svg-icon"
        >
          <g
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2"
            strokeLinecap="round"
            stroke="currentColor"
            fillRule="evenodd"
            fill="none"
          >
            <path d="M19 14.5C15.5 8 6.5 8 4 15M14.982 15H20l-.018-5"></path>
          </g>
        </svg>
      </div>
    </div>
  );
}
