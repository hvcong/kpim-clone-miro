import useGlobalStore, { eToastType } from '@/store';
import React from 'react';
import { useEffect } from 'react';

type Props = {};

export default function BottomToast({}: Props) {
  const { bottomToast, setBotoomToast } = useGlobalStore();

  useEffect(() => {
    let timeId: any = null;
    if (bottomToast.title) {
      if (bottomToast.timeout !== 0) {
        timeId = setTimeout(() => {
          setBotoomToast();
        }, bottomToast.timeout);
      }
    }

    return () => {
      if (timeId) {
        clearTimeout(timeId);
      }
    };
  }, [bottomToast]);

  if (!bottomToast.title) return;
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[60]">
      <div
        className={`text-sm px-3 py-1 rounded ${
          bottomToast.type === eToastType.fetching && 'bg-black text-white'
        } 
      ${bottomToast.type === eToastType.success && 'bg-green-500 text-white'}
      ${bottomToast.type === eToastType.error && 'bg-red-500 text-white'}
      `}
      >
        {bottomToast.title}
      </div>
    </div>
  );
}
