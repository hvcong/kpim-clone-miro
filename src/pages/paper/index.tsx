"use client";
import React, { useEffect, useRef } from "react";

import LeftMenuList from "@/components/paperSideBar/LeftMenuList";
import ScaleMenu from "@/components/paperSideBar/ScaleMenu";
import Canvas from "@/components/paper/Canvas";
import usePaperStore from "@/store/paper_store";
import { fabric } from "fabric";
import ShapePopup from "@/components/paper/ShapePopup";
import TopLeftMenu from "@/components/topmenu/TopLeftMenu";
import TopRightMenu from "@/components/topmenu/TopRightMenu";
import TopMenu from "@/components/topmenu/TopMenu";
import RightSideBar from "@/components/paperSideBar/RightSideBar";
import PaperDetailModal from "@/components/topmenu/PaperDetailModal";
import LeftSideBar from "@/components/paperSideBar/LeftSideBar";

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

    function onScalePaper(e: WheelEvent) {
      // prevent scale screen of browser
      if (e.ctrlKey) {
        e.preventDefault();
      }
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
    <div className='relative w-screen h-screen bg-white cursor-default select-none overflow-hidden'>
      <Canvas />

      <PaperDetailModal />
      <TopMenu />
      <RightSideBar />
      <LeftSideBar />
    </div>
  );
}
