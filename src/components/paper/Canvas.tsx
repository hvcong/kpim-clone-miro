import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { fabric } from "fabric";
import usePaperStore from "@/store/paper_store";
import useToolStore from "@/store/tool_store";

type Props = {};

export default function Canvas({}: Props) {
  const { scale, pointScale, setScale, canvas } = usePaperStore();
  const { tool } = useToolStore();

  useEffect(() => {
    if (canvas) {
      document.getElementsByTagName("canvas")[2].style.display = "none";
      // canvas.isDrawingMode = true;
      // handleScale();

      // event delete by delete key
      document.addEventListener("keydown", deleteObjByKeyBoard);
    }

    return () => {
      if (canvas) {
        canvas.off("mouse:down");
        canvas.off("mouse:up");
        canvas.off("mouse:move");
        document.removeEventListener;
      }
    };
  }, [canvas]);

  function handleScale() {
    if (!canvas) return;
    canvas.on("mouse:wheel", (opt) => {
      var delta = opt.e.deltaY < 0 ? 1 : -1;
      var zoom = canvas.getZoom();
      zoom += zoom * (delta / 10);
      if (zoom > 5) zoom = 5;
      if (zoom > 0.99 && zoom < 1.01) zoom = 1;
      if (zoom < 0.01) zoom = 0.01;

      zoom = Math.round(zoom * 100) / 100;

      setScale(zoom, opt.e.offsetX, opt.e.offsetY);
    });
  }

  function deleteObjByKeyBoard(e: KeyboardEvent) {
    if (!canvas) return;

    if (e.code === "Delete") {
      const objectSelecteds = canvas.getActiveObjects();
      canvas.remove(...objectSelecteds);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }

  useEffect(() => {
    if (canvas) {
      canvas.zoomToPoint(pointScale, scale);
    }
    return () => {};
  }, [scale, pointScale]);

  return (
    <>
      <div className='absolute z-10 flex space-x-2'>
        {/* <div
          className='bg-red-300 cursor-pointer p-2 m-1'
          onClick={(e) => {
            if (canvas) {
              const vtf = canvas?.viewportTransform;
              let x = 0;
              let y = 0;
              if (vtf) {
                x = vtf[4] || 0;
                y = vtf[5] || 0;
              }
              const rect = new fabric.Rect({
                left: (50 - x) / scale,
                top: (50 - y) / scale,
                fill: "blue",
                width: 100 / scale,
                height: 100 / scale,
              });

              canvas.add(rect);
            }

            e.stopPropagation();
          }}
        >
          add rect
        </div> */}
      </div>

      <canvas id='canvas' className='relative'></canvas>
    </>
  );
}
