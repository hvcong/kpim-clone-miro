import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { fabric } from 'fabric';
import usePaperStore from '@/store/paper_store';
import useToolStore from '@/store/tool_store';
import { calcCoordSelection, uuid } from './../../utils/index';
import useDrawnStore, { DrawnObjectType } from '@/store/drawn_object_store';
import drawnObjApi from '@/api/drawnObjApi';
import { useMutation, useQuery } from 'react-query';
import { Frame } from '@/utils/customFabricClass';
import { DrawnObject } from '@/utils/types';
import useGlobalStore from '@/store';
import socketHandler from '@/handler/socketHandler';
type Props = {
  paperId: string;
};
async function getAllDrawnObj(paperId: string) {
  return await drawnObjApi.getAllByPaperId(paperId);
}

export default function Canvas({ paperId }: Props) {
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

  const drawnStore = useDrawnStore();
  const { paper, setPaper } = usePaperStore();
  const { setFullLoading, socket } = useGlobalStore();

  useEffect(() => {
    if (paper && canvas) {
      drawAll(paper.DrawnObjects);
      setTimeout(() => {
        setFullLoading(false);
      }, 1000);
      // canvas.isDrawingMode = true;
      // handleScale();
      console.log(paper.id);

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
        canvas.off('object:added');
        canvas.off('object:removed');
        canvas.off('object:moving');
        canvas.off('object:modified');
        canvas.off('object:scaling');
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
        document.removeEventListener('keydown', deleteObjByKeyBoard);
      }
    };
  }, [paper]);

  useEffect(() => {
    function handleOffline() {}
    if (socket && canvas) {
      window.addEventListener('offline', handleOffline);

      // Other code and event handlers
      socket.on('connect', () => {
        console.log('connect');
      });

      socket.on('paper_data', ({ paper }) => {
        console.log('aaa');
        setPaper({
          ...paper,
          value: JSON.parse(paper.value),
        });
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });

      socket.on('connect_error', () => {
        console.log('connect err');
      });
    }

    return () => {
      if (socket) {
        window.removeEventListener('offline', handleOffline);
        socket.removeAllListeners();
      }
    };
  }, [socket, canvas]);

  function drawAll(drawnObjList: DrawnObject[]) {
    if (!canvas) return;

    let list = drawnObjList.map((item) => JSON.parse(item.value));

    canvas.getObjects().map((item) => {
      canvas.remove(item);
    });
    canvas.requestRenderAll();

    let objs = list
      .map((item) => {
        switch (item.type) {
          case 'rect':
            return new fabric.Rect(item);

          case 'textbox':
            if (item.isFrameLabel) {
              return null;
            } else {
              return new fabric.Textbox('', item);
            }
          case 'path':
            return new fabric.Path(item.path, item);
          case 'frame':
            return new Frame(item);

          default:
            break;
        }
      })
      .filter((obj) => obj);

    objs.map((item) => {
      canvas.add(item);
      canvas.requestRenderAll();
    });
  }

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
    const target = e.target as DrawnObjectType;
    const id = uuid();
    //
    if (target.removedType === 'byGroup') return;

    if (target.type === 'group') return;
    if (target.type === 'frame') {
      let text = target.text as DrawnObjectType;
      target?.set({
        id,
      });
      drawnStore.addOne(target);

      text.set({
        frameId: id,
        isFrameLabel: true,
      });
      canvas?.add(text);
      canvas?.requestRenderAll();
      return;
    }

    target?.set({
      id,
    });

    drawnStore.addOne(target);
  }

  function handleModified(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    console.log('event modified');

    if (canvas?.getActiveObjects().length > 0) {
      setShowStyleBar(true);
    }
    let target = e.target as DrawnObjectType;

    // change many object
    if (target._objects) {
      let list = target._objects || [];
      list.map((item) => {
        let _item = item as DrawnObjectType;
        drawnStore.updateOne(_item);
      });
    } else {
      // change one object

      drawnStore.updateOne(target);
    }
  }

  function handleObjRemoved(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    let target = e.target as DrawnObjectType;

    if (target.removedType !== 'byGroup') {
      drawnStore.removeOne(target.toDatalessObject(['id']));
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
      {/* <div className="absolute z-50 top-32 left-32 flex space-x-2">
        <div
          className="bg-red-300 cursor-pointer p-2 m-1"
          onClick={(e) => {
            console.log(socket);
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

            // const a = new fabric.Rect({
            //   left: 200,
            //   top: 200,
            //   height: 100,
            //   width: 100,
            //   fill: 'green',
            // });

            // canvas.add(a);
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
      </div> */}
    </>
  );
}
