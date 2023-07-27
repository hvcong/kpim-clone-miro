import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { fabric } from "fabric";
import usePaperStore from "@/store/paper_store";

type Props = {};

export default function Canvas({}: Props) {
  const { scale, setScale, canvas } = usePaperStore();

  useEffect(() => {
    if (canvas) {
      console.log("render");
      initDrawn();
      handleAddEvent();
    }

    return () => {
      if (canvas) {
        handleClearEvent();
      }
    };
  }, [canvas, scale]);

  function handleAddEvent() {
    if (!canvas) return;

    // canvas scale
    canvas.on("mouse:wheel", (options) => {
      const { e } = options;

      const delta = e.deltaY > 0 ? -1 : 1;

      const currentScale = Math.max(1, Math.min(scale + delta, 400));
      setScale(currentScale);
    });
  }

  function handleClearEvent() {
    if (!canvas) return;
  }

  function initDrawn() {
    if (!canvas) return;

    console.log(canvas);
    console.log("draw init");
    canvas.clear();
    var circle = new fabric.Circle({
      radius: 20,
      fill: "green",
      left: 100,
      top: 100,
    });
    var triangle = new fabric.Triangle({
      width: 20,
      height: 30,
      fill: "blue",
      left: 500,
      top: 500,
    });

    canvas.add(circle, triangle);

    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);

    canvas.requestRenderAll();

    if (
      document.getElementsByClassName("canvas-container")[0] &&
      document.getElementsByClassName("canvas-container")[0].getElementsByTagName("canvas")[2]
    ) {
      document
        .getElementsByClassName("canvas-container")[0]
        .getElementsByTagName("canvas")[2].style.display = "none";
    }
  }

  return (
    <>
      <canvas id='canvas' className='relative'></canvas>
    </>
  );
}
