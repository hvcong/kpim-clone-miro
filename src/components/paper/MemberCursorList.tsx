import useDrawnStore from '@/store/drawn_object_store';
import usePaperStore from '@/store/paper_store';
import React from 'react';

type Props = {};

export default function MemberCursorList({}: Props) {
  const { memberOnlineList } = usePaperStore();
  return (
    <>
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 z-30">
      <div className="relative">
        <div className="absolute top-32 left-32">asfasdfasdf</div>
      </div>
    </div> */}
    </>
  );
}
