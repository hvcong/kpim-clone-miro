import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { fabric } from 'fabric';
import usePaperStore from '@/store/paper_store';
import useToolStore from '@/store/tool_store';
import { calcCoordSelection, uuid } from './../../utils/index';
import useDrawnStore, { DrawObjectType } from '@/store/drawn_object_store';
type Props = {};

export default function Canvas({}: Props) {
  const {
    scale,
    pointScale,
    setScale,
    canvas,
    isSaving,
    showStyleBar,
    setShowStyleBar,
  } = usePaperStore();
  const { tool } = useToolStore();

  const { drawnObjectList, addOne, removeOne, updateOne } = useDrawnStore();

  useEffect(() => {
    if (canvas) {
      // canvas.isDrawingMode = true;
      // handleScale();

      canvas.on('object:added', handleAddedNewObject);

      canvas.on('object:removed', handleObjRemoved);

      canvas.on('object:moving', handleObjMoving);

      canvas.on('object:modified', handleModified);

      canvas.on('object:scaling', handleObjScaling);

      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:updated', handleSelectionUpdated);

      canvas.on('selection:cleared', handleSelectionCleared);

      // event delete by delete key
      document.addEventListener('keydown', deleteObjByKeyBoard);
    }

    return () => {
      if (canvas) {
        canvas.removeListeners();
        document.removeEventListener('keydown', deleteObjByKeyBoard);
      }
    };
  }, [canvas]);

  function handleScale() {
    if (!canvas) return;
    canvas.on('mouse:wheel', (opt) => {
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

  function handleSelectionUpdated(e: fabric.IEvent<MouseEvent>) {
    setShowStyleBar(true);
  }

  function deleteObjByKeyBoard(e: KeyboardEvent) {
    if (!canvas) return;

    if (e.code === 'Delete') {
      const objectSelecteds = canvas.getActiveObjects();
      canvas.remove(...objectSelecteds);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }

  function handleAddedNewObject(e: fabric.IEvent<MouseEvent>) {
    const target = e.target as DrawObjectType;
    const id = uuid();
    //
    if (target.removedType === 'byGroup') return;

    if (target.type === 'group') return;
    if (target.type === 'frame') {
      let text = target.text as DrawObjectType;
      target?.set({
        id,
      });
      addOne(target);

      text.set({
        frameId: id,
        isFrameLabel: true,
      });
      canvas?.add(text);
      canvas?.requestRenderAll();
      return;
    }

    console.log('added:', target.type);
    target?.set({
      id,
    });
    addOne(target);
  }

  function handleModified(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    console.log('event modified');

    if (canvas?.getActiveObjects().length > 0) {
      setShowStyleBar(true);
    }
    let target = e.target as DrawObjectType;

    // change many object
    if (target._objects) {
      let list = target._objects || [];
      list.map((item: DrawObjectType) => {
        updateOne(item);
      });
    } else {
      // change one object

      updateOne(target);
    }
  }

  function handleObjRemoved(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    let target = e.target as DrawObjectType;

    if (target.removedType !== 'byGroup') {
      removeOne(target.toDatalessObject(['id']));
    }
  }

  function handleObjScaling(e: fabric.IEvent<MouseEvent>) {
    setShowStyleBar(false);
  }

  /**  selection */
  function handleSelectionCreated(e: fabric.IEvent<MouseEvent>) {
    if (!e.selected) return;
    let coord = calcCoordSelection(e.selected);
    setShowStyleBar(true);
  }

  function handleSelectionCleared(e: fabric.IEvent<MouseEvent>) {
    setShowStyleBar(false);
  }

  function handleObjMoving(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    setShowStyleBar(false);
  }

  useEffect(() => {
    if (canvas) {
      canvas.zoomToPoint(pointScale, scale);
    }
    return () => {};
  }, [scale, pointScale, canvas]);

  return (
    <>
      <div className="absolute z-10 flex space-x-2">
        <div
          className="bg-red-300 cursor-pointer p-2 m-1"
          onClick={(e) => {
            if (!canvas) return;
            // const vtf = canvas?.viewportTransform;
            // let x = 0;
            // let y = 0;
            // if (vtf) {
            //   x = vtf[4] || 0;
            //   y = vtf[5] || 0;
            // }
            // const rect = new fabric.Rect({
            //   left: (50 - x) / scale,
            //   top: (50 - y) / scale,
            //   fill: 'blue',
            //   width: 100 / scale,
            //   height: 100 / scale,
            // });

            // canvas.add(rect);

            // canvas.requestRenderAll();

            const a = new fabric.Rect({
              left: 200,
              top: 200,
              height: 100,
              width: 100,
              fill: 'green',
            });

            canvas.add(a);
          }}
        >
          add rect
        </div>
        <div
          className="bg-red-300 cursor-pointer p-2 m-1"
          onClick={(e) => {
            if (canvas) {
              let objs = canvas.getObjects();
              objs.map((obj) => {
                canvas.remove(obj);
              });
              canvas.requestRenderAll();
            }
            e.stopPropagation();
          }}
        >
          clear all
        </div>
        {isSaving && (
          <div className="bg-red-300 cursor-pointer p-2 m-1">Saving...</div>
        )}
      </div>
    </>
  );
}
