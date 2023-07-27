"use client";
import React, { useEffect, useRef } from "react";

import LeftMenuList from "@/components/paper/LeftMenuList";
import ScaleMenu from "@/components/paper/ScaleMenu";
import Canvas from "@/components/paper/Canvas";
import usePaperStore from "@/store/paper_store";
import { fabric } from "fabric";

type Props = {};

export default function Paper({}: Props) {
  const { setCanvas } = usePaperStore();

  useEffect(() => {
    // init canvas

    const canvas = new fabric.Canvas("canvas");
    setCanvas(canvas);

    // prevent scale screen
    function onScalePaper(e: WheelEvent) {
      e.preventDefault();
    }
    document.addEventListener("wheel", onScalePaper, {
      passive: false,
    });
    return () => {
      document.removeEventListener("wheel", onScalePaper);
    };
  }, []);

  return (
    <div className='relative w-screen h-screen bg-gray-200 cursor-default'>
      <Canvas />
      <LeftMenuList />
      <ScaleMenu />
    </div>
  );
}
