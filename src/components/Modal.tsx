import React, { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  close: () => void;
  show: boolean;
};

export default function Modal({ children, close, show }: Props) {
  const contenRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeWhenClickOutSide(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (!contenRef?.current?.contains(target)) {
        close();
      }
    }

    if (show && contenRef.current && containerRef.current) {
      containerRef.current.addEventListener('click', closeWhenClickOutSide);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          'click',
          closeWhenClickOutSide,
        );
      }
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/30"
      ref={containerRef}
    >
      <div className="h-full w-full flex justify-center items-center">
        {/* <button onClick={close}>close</button> */}
        <div ref={contenRef}>{children}</div>
      </div>
    </div>
  );
}
