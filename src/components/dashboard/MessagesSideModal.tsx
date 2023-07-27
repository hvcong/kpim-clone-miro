import React from 'react';

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function MessagesSideModal({ show, setShow }: Props) {
  return (
    <div
      className={`fixed flex flex-col py-3 bg-white transition-all duration-700 border-l right-0 top-0 bottom-0 overflow-hidden ${
        show ? 'animate-message-fade-in' : 'w-0'
      }`}
    >
      <div className="flex items-center pb-3 px-4">
        <h3 className="flex-1 text-xl font-semibold">Messages</h3>
        <div className="p-3 cursor-pointer">
          <svg
            className="w-4 h-4 text-gray-800 hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
            />
          </svg>
        </div>
        <div
          className="py-3 pl-3 cursor-pointer"
          onClick={() => {
            setShow(false);
          }}
        >
          <svg
            className="w-4 h-4 text-gray-800 hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </div>
      </div>

      {/* message list */}
      <div className="flex-1 flex flex-col space-y-4 px-4 pb-12 cursor-default  overflow-y-auto">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            return (
              <div key={index} className="">
                <h6 className="py-3 text-sm">aaaa</h6>
                <div className="p-3 rounded-md border-gray-300 border hover:shadow-md transition-all">
                  <div className="">
                    <span className="">
                      <b>Hoang van cong</b> invited you to edit
                    </span>
                  </div>
                  <div className="flex justify-between mt-4 items-end">
                    <div className=" flex py-1.5 px-3 rounded text-white bg-blue-600 text-xs transition-all justify-center items-end cursor-pointer hover:bg-blue-700">
                      Go to paper
                    </div>
                    <span className="text-gray-400">2d</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
