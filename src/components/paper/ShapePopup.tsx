import useToolStore from "@/store/tool_store";
import React, { useEffect, useRef } from "react";

type Props = {
  show: boolean | undefined;
  close: () => void;
};

export default function ShapePopup({ show, close }: Props) {
  const { shapeType, tool, setShapeType } = useToolStore();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closePopupWhenClickOutSide({ target }: MouseEvent) {
      if (!containerRef.current?.contains(target as HTMLElement)) {
        console.log("close");
        close();
      }
    }

    if (show) {
      console.log("add event");
      document.addEventListener("click", closePopupWhenClickOutSide);
    }

    return () => {
      document.removeEventListener("click", closePopupWhenClickOutSide);
    };
  }, [show]);

  return (
    <div
      className={`absolute top-1/2 left-full  bg-white -translate-y-1/2 translate-x-2 shadow-lg rounded-md ${
        !show && "hidden"
      }`}
      ref={containerRef}
    >
      <div
        className='w-11 h-11 flex justify-center items-center group'
        onClick={(e) => {
          setShapeType("rectangle");
          close();
          e.stopPropagation();
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 448 512'
          className={`group-hover:text-blue-600 ${shapeType === "rectangle" && "text-blue-600"}`}
        >
          <path
            fill='currentColor'
            d='M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z'
          />
        </svg>
      </div>
      <div
        className='w-11 h-11 flex justify-center items-center group'
        onClick={(e) => {
          setShapeType("eclipse");
          close();
          e.stopPropagation();
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 512 512'
          className={`group-hover:text-blue-600 ${shapeType === "eclipse" && "text-blue-600"}`}
        >
          <path
            fill='currentColor'
            d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'
          />
        </svg>
      </div>
      <div
        className='w-11 h-11 flex justify-center items-center group'
        onClick={(e) => {
          setShapeType("triangle");
          close();
          e.stopPropagation();
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 512 512'
          className={`group-hover:text-blue-600 ${shapeType === "triangle" && "text-blue-600"}`}
        >
          <path
            fill='currentColor'
            d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'
          />
        </svg>
      </div>
    </div>
  );
}
