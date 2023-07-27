import React, { useState } from 'react';

type Props = {};

type ToolType = 'pen' | 'text' | 'default' | 'shape';
export default function ToolList({}: Props) {
  const [tool, setTool] = useState<ToolType>('default');
  return (
    <div className="bg-white flex flex-col rounded-md shadow-lg">
      <div
        onClick={() => {
          setTool('default');
        }}
        className={`ct-menu-item ${tool === 'default' && 'active'}`}
      >
        <svg
          className="ct-menu-icon"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
          />
        </svg>
      </div>
      {/* template */}
      <div className={`ct-menu-item`}>
        <svg
          viewBox="0 0 24 24"
          className="ct-menu-icon"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          data-testid="svg-icon"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            d="M4 4V8H20V4H4ZM4 20V10H8V20H4ZM10 20H20V10H10V20ZM3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      {/* pen */}
      <div
        onClick={() => {
          setTool('pen');
        }}
        className={`ct-menu-item ${tool === 'pen' && 'active '}`}
      >
        <svg
          className="ct-menu-icon "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 21 21"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
          />
        </svg>
      </div>

      {/* text */}
      <div
        onClick={() => {
          setTool('text');
        }}
        className={`ct-menu-item ${tool === 'text' && 'active'}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="ct-menu-icon"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          data-testid="svg-icon"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7C21 7.55228 20.5523 8 20 8C19.4477 8 19 7.55228 19 7V5H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V5H5V7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7V5Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {/* shape */}
      <div
        onClick={() => {
          setTool('shape');
        }}
        className={`ct-menu-item ${tool === 'shape' && 'active'}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="ct-menu-icon"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          data-testid="svg-icon"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            d="M15.5 14C18.5376 14 21 11.5376 21 8.5C21 5.46243 18.5376 3 15.5 3C12.4624 3 10 5.46243 10 8.5C10 8.66854 10.0076 8.83532 10.0224 9H14C14.5523 9 15 9.44771 15 10V13.9776C15.1647 13.9924 15.3315 14 15.5 14ZM15 15.9836V21C15 21.5523 14.5523 22 14 22H3C2.44772 22 2 21.5523 2 21V10C2 9.44771 2.44772 9 3 9H8.0164C8.00552 8.83474 8 8.66801 8 8.5C8 4.35786 11.3579 1 15.5 1C19.6421 1 23 4.35786 23 8.5C23 12.6421 19.6421 16 15.5 16C15.332 16 15.1653 15.9945 15 15.9836ZM4 20V11H13V20H4Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
}
