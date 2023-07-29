"use client";
import React, { useEffect, useRef } from "react";

import LeftMenuList from "@/components/paper/LeftMenuList";
import ScaleMenu from "@/components/paper/ScaleMenu";
import Canvas from "@/components/paper/Canvas";
import usePaperStore from "@/store/paper_store";
import { fabric } from "fabric";
import ShapePopup from "@/components/paper/ShapePopup";

type Props = {};

export default function Paper({}: Props) {
  const { canvas, setCanvas } = usePaperStore();

  useEffect(() => {
    // init canvas
    if (!canvas) {
      const canvas = new fabric.Canvas("canvas", {
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: "#f2f2f2",
        // isDrawingMode: true,
        enableRetinaScaling: true,
      });

      setCanvas(canvas);
    }

    // prevent scale screen
    function onScalePaper(e: WheelEvent) {
      e.preventDefault();
    }
    document.addEventListener("wheel", onScalePaper, {
      passive: false,
    });
    return () => {
      document.removeEventListener("wheel", onScalePaper);
      setCanvas(null);
    };
  }, []);

  return (
    <div className='relative w-screen h-screen bg-white cursor-default'>
      <Canvas />
      <LeftMenuList />
      <ScaleMenu />
    </div>
  );
}
