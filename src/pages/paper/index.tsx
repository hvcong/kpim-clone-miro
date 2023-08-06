'use client';
import React, { useEffect, useRef } from 'react';

import ScaleMenu from '@/components/paperSideBar/ScaleMenu';
import Canvas from '@/components/paper/Canvas';
import usePaperStore from '@/store/paper_store';
import { fabric } from 'fabric';

import TopMenu from '@/components/topmenu/TopMenu';
import RightSideBar from '@/components/paperSideBar/RightSideBar';
import PaperDetailModal from '@/components/topmenu/PaperDetailModal';
import LeftSideBar from '@/components/paperSideBar/LeftSideBar';
import StyleBar from '@/components/paper/bars/StyleBar';
import useDrawnStore from '@/store/drawn_object_store';

type Props = {};

export default function Paper({}: Props) {
  const { canvas, setCanvas } = usePaperStore();
  const { drawnObjectList, resetDrawnState } = useDrawnStore();
  console.log('data', drawnObjectList);

  useEffect(() => {
    // init canvas
    if (!canvas) {
      const newCanvas = new fabric.Canvas('canvas', {
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: '#f2f2f2',
        // isDrawingMode: true,
        enableRetinaScaling: true,
      });

      setCanvas(newCanvas);
    }
    function onScalePaper(e: WheelEvent) {
      // prevent scale screen of browser
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }
    document.addEventListener('wheel', onScalePaper, {
      passive: false,
    });

    return () => {
      document.removeEventListener('wheel', onScalePaper);
      setCanvas(null);
      resetDrawnState();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-white cursor-default select-none overflow-hidden">
      <canvas id="canvas" className="relative"></canvas>
      {canvas && <Canvas />}

      <PaperDetailModal />
      <TopMenu />
      <RightSideBar />
      <LeftSideBar />
      <StyleBar />
    </div>
  );
}
