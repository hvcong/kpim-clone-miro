import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { fabric } from 'fabric';
import usePaperStore from '@/store/paper_store';
import useToolStore from '@/store/tool_store';
import {
  calcCoordSelection,
  convertDataLessToCanvasObj,
  uuid,
} from './../../utils/index';
import useDrawnStore from '@/store/drawn_object_store';
import drawnObjApi from '@/api/drawnObjApi';
import { useMutation, useQuery } from 'react-query';
import { Frame } from '@/utils/customFabricClass';
import {
  CanvasObjectType,
  DrawnObject,
  MousePointer,
  Paper,
} from '@/types/types';
import useGlobalStore from '@/store';
import useSocketIoStore, { moreProperties } from '@/store/socketio_store';
type Props = {
  paperId: string;
};

export default function Canvas({ paperId }: Props) {
  const { scale, pointScale, setScale, canvas, setShowStyleBar } =
    usePaperStore();
  const toolStore = useToolStore();

  const drawnStore = useDrawnStore();
  const paperStore = usePaperStore();
  const { setFullLoading } = useGlobalStore();
  const { socket, setSocket, ...socketIoStore } = useSocketIoStore();

  const activedTranformViewPort = useRef<boolean>(false);
  const mousePointRoot = useRef<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  useEffect(() => {
    let paper = paperStore.paper;
    if (paper && canvas) {
      console.log('add event');
      setFullLoading(false);
      handleScale();

      canvas.on('object:added', handleAddedNewObject);

      canvas.on('object:added_many', handleObjAddedMany);

      canvas.on('object:removed_many', handleObjRemovedMany);

      canvas.on('object:moving', handleObjMoving);

      canvas.on('object:modified', handleModified);

      canvas.on('object:scaling', handleObjScaling);

      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:updated', handleSelectionUpdated);
      canvas.on('selection:cleared', handleSelectionCleared);

      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:up', handleMouseUp);

      // event delete by delete key
      document.addEventListener('keydown', deleteObjByKeyBoard);
      drawAll();
    }

    return () => {
      if (canvas && paper) {
        console.log('remove event');
        canvas.off('object:added');
        canvas.off('object:removed');
        canvas.off('object:moving');
        canvas.off('object:modified');
        canvas.off('object:scaling');
        canvas.off('selection:created');

        canvas.off('selection:updated');
        canvas.off('selection:cleared');
        canvas.off('mouse:down');

        document.removeEventListener('keydown', deleteObjByKeyBoard);
        canvas.clear();
        drawnStore.resetDrawnState();
      }
    };
  }, [paperStore.paper?.id]);

  function drawAll() {
    // just call this affter canvas listent all event
    if (!canvas) return;
    let list = drawnStore.drawnObjList.map((item) => {
      let obj = JSON.parse(item.value);
      if (item.ChangeLog.type === 'DELETE') {
        obj.visible = false;
      } else {
        obj.visible = true;
      }
      return obj;
    });
    let objs = list.map((item) => {
      return convertDataLessToCanvasObj(item);
    });

    objs.map((obj) => {
      if (!obj) return;
      let item = obj as CanvasObjectType;

      item.ct_fromEmit = true;
      canvas.add(item);
      canvas.requestRenderAll();
    });
  }

  function handleDrawGridLayout() {
    if (!canvas) return null;

    var scale = paperStore.getScale();
    var grid = 200 * scale;
    var canvasWidth = canvas.getWidth();
    var canvasHeight = canvas.getHeight();
    let vtf = canvas.viewportTransform;
    if (!vtf) return;
    let tfX = vtf[4];
    let tfY = vtf[5];

    let listLine = [];

    let _list = canvas.getObjects().filter((item) => item.type === 'line');
    canvas.remove(..._list);

    // grid 1
    for (var i = 0; i <= canvasWidth / grid; i++) {
      let stroke = `rgba(0,0,0,${0.3})`;
      let strokeWidth = 1 - 1 / 10;

      let oLine: fabric.ILineOptions = {
        type: 'line',
        stroke,
        strokeWidth,
        selectable: false,
        // visible: scale > 0.8 ? false : true,
      };

      let line = new fabric.Line(
        [
          (i * grid - tfX) / scale,
          (0 - tfY) / scale,
          (i * grid - tfX) / scale,
          (canvasHeight - tfY) / scale,
        ],
        oLine,
      );

      listLine.push(line);

      line = new fabric.Line(
        [
          (0 - tfX) / scale,
          (i * grid - tfY) / scale,
          (canvasWidth - tfX) / scale,
          (i * grid - tfY) / scale,
        ],
        oLine,
      );
      listLine.push(line);
    }

    // grid 2
    // grid = grid / 5;
    // for (var i = 0; i < canvasWidth / grid; i++) {
    //   let stroke = `rgba(0,0,0,${0.3})`;
    //   let strokeWidth = 1 - 1 / 10;

    //   let oLine: fabric.ILineOptions = {
    //     type: 'line',
    //     stroke,
    //     strokeWidth,
    //     selectable: false,
    //     visible: scale > 3 ? false : true,
    //   };

    //   let line = new fabric.Line(
    //     [
    //       (i * grid - tfX) / scale,
    //       (0 - tfY) / scale,
    //       (i * grid - tfX) / scale,
    //       (canvasHeight - tfY) / scale,
    //     ],
    //     oLine,
    //   );

    //   listLine.push(line);

    //   line = new fabric.Line(
    //     [
    //       (0 - tfX) / scale,
    //       (i * grid - tfY) / scale,
    //       (canvasWidth - tfX) / scale,
    //       (i * grid - tfY) / scale,
    //     ],
    //     oLine,
    //   );
    //   listLine.push(line);
    // }

    // // grid 3
    // grid = grid / 5;
    // for (var i = 0; i < canvasWidth / grid; i++) {
    //   let stroke = `rgba(0,0,0,${0.3})`;
    //   let strokeWidth = 1 - 1 / 10;

    //   let oLine: fabric.ILineOptions = {
    //     type: 'line',
    //     stroke,
    //     strokeWidth,
    //     selectable: false,
    //     visible: scale > 3 ? true : false,
    //   };

    //   let line = new fabric.Line(
    //     [
    //       (i * grid - tfX) / scale,
    //       (0 - tfY) / scale,
    //       (i * grid - tfX) / scale,
    //       (canvasHeight - tfY) / scale,
    //     ],
    //     oLine,
    //   );

    //   listLine.push(line);

    //   line = new fabric.Line(
    //     [
    //       (0 - tfX) / scale,
    //       (i * grid - tfY) / scale,
    //       (canvasWidth - tfX) / scale,
    //       (i * grid - tfY) / scale,
    //     ],
    //     oLine,
    //   );
    //   listLine.push(line);
    // }

    canvas.add(...listLine);
    canvas.requestRenderAll();
  }

  useEffect(() => {
    function handleOffline() {}

    if (socket && canvas) {
      window.addEventListener('offline', handleOffline);

      // Other code and event handlers
      socket.on('connect', () => {
        console.log('connect');
      });

      socket.on(
        'sv:paper:load_all',
        (paper: Paper & { DrawnObjects: DrawnObject[] }) => {
          console.log('load data');
          if (paper) {
            const { DrawnObjects, ...p } = paper;

            drawnStore.setDrawnObjList(DrawnObjects);

            paperStore.setPaper({
              ...p,
              value: JSON.parse(p.value),
            });
          }
        },
      );

      socket.on('sv:drawn_obj:add', drawnStore.on_addOne);
      socket.on('sv:drawn_obj:remove_one', drawnStore.on_removeOne);
      socket.on('sv:drawn_obj:remove_many', drawnStore.on_removeMany);
      socket.on('sv:drawn_obj:update_one', drawnStore.on_updateOne);
      socket.on('sv:drawn_obj:update_many', drawnStore.on_updateMany);

      socket.on('sv:paper:update_name', paperStore.on_updatePaperName);
      socket.on('sv:paper:list_member', paperStore.on_setListMemberOnline);

      socket.on('sv:member:open_paper', paperStore.on_addOneMemberOnline);
      socket.on('sv:member:close_paper', paperStore.on_removeOneMemberOnline);

      socket.on('disconnect', () => {
        console.log('disconnect');
      });

      socket.on('connect_error', () => {
        console.log('connect err');
      });
    }

    return () => {
      if (socket && canvas) {
        window.removeEventListener('offline', handleOffline);
        socket.removeAllListeners();
      }
    };
  }, [socket, canvas]);

  useEffect(() => {
    if (canvas && socket && paperStore.showCursorPartner) {
      console.log('on_cursor moving');
      socket.on(
        'sv:member:mouse_moving',
        ({ pointer }: { pointer: MousePointer; userId: string }) => {
          console.log('cursor moving', pointer);
        },
      );
    }

    return () => {};
  }, [paperStore.showCursorPartner]);

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

  function handleMouseMove(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    const pointer = e.pointer as MousePointer;

    if (activedTranformViewPort.current) {
      // canvas.defaultCursor = 'grabbing';
      const vtf = canvas.viewportTransform;

      if (vtf) {
        let scaleX = canvas.getZoom();
        let scaleY = canvas.getZoom();
        let tfX = vtf[4] + e.e.movementX;
        let tfY = vtf[5] + e.e.movementY;
        canvas.viewportTransform = [scaleX, 0, 0, scaleY, tfX, tfY];

        canvas.requestRenderAll();
      }
    }

    // paperStore.emit_memberMouseMoving(pointer);
  }

  function handleMouseDown(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    if (e.button === 3) {
      // when tranform viewport
      activedTranformViewPort.current = true;
      mousePointRoot.current.clientX = e.e.clientX;
      mousePointRoot.current.clientY = e.e.clientY;
    }
  }
  function handleMouseUp(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    if (e.button === 3) {
      // when tranform viewport
      activedTranformViewPort.current = false;
    }
  }

  function handleSelectionUpdated(e: fabric.IEvent<MouseEvent>) {
    setShowStyleBar(true);
  }

  function deleteObjByKeyBoard(e: KeyboardEvent) {
    if (!canvas) return;

    if (e.code === 'Delete') {
      const objectSelecteds = canvas.getActiveObjects();
      if (objectSelecteds) {
        canvas.remove(...objectSelecteds);
        canvas.requestRenderAll();
        canvas.fire('object:removed_many', { targetList: objectSelecteds });
      }
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }

  function handleAddedNewObject(e: fabric.IEvent<MouseEvent>) {
    if (!canvas || !socket) return;
    const target = e.target as CanvasObjectType;
    const id = uuid();

    if (target.type === 'line') return;

    if (target.type === 'path' && !target.ct_fromEmit) {
      console.log(toolStore.getPenType());
      if (toolStore.getPenType() === 'hightlight') {
        target.ct_hightLightPen = true;
      }
    }

    //
    if (target.removedType === 'byGroup') {
    } else if (target.type === 'group') {
    } else if (target.type === 'frame') {
      // let text = target.text as CanvasObjectType;
      // target.set({
      //   id,
      // });
      // drawnStore.addOne(target);
      // text.set({
      //   frameId: id,
      //   isFrameLabel: true,
      // });
      // canvas.add(text);
      // canvas.requestRenderAll();
    } else {
      if (target.ct_fromEmit) {
        target.set({
          ct_fromEmit: false,
        });
      } else {
        if (!target.id) {
          target.set({
            id,
          });
        }
        drawnStore.addOne(target);
      }
      canvas.requestRenderAll();
    }
  }

  function handleObjAddedMany(e: fabric.IEvent<Event>) {}

  function handleModified(e: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    console.log('canvas-modified');

    if (canvas?.getActiveObjects().length > 0) {
      setShowStyleBar(true);
    }
    let target = e.target as CanvasObjectType;
    // change many object
    if (target && target._objects) {
      let list = target._objects as CanvasObjectType[];
      console.log(list[0]);
      drawnStore.updateMany(list);
    } else {
      // change one object
      if (target.ct_fromEmit) {
        target.ct_fromEmit = false;
        canvas.requestRenderAll();
      } else {
        drawnStore.updateOne(target);
      }
    }
  }

  function handleObjRemovedMany(_: fabric.IEvent<Event>) {
    console.log('canvas-removed-obj');
    if (!canvas) return;
    let options = _ as unknown as { targetList: CanvasObjectType[] };

    drawnStore.removeMany(options.targetList);
  }

  function handleObjScaling(e: fabric.IEvent<MouseEvent>) {
    setShowStyleBar(false);
  }

  /**  selection */
  function handleSelectionCreated(e: fabric.IEvent<MouseEvent>) {
    if (!e.selected) return;
    let coord = calcCoordSelection(e.selected);
    let item = e.selected[0];
    console.log(item);

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

      // handleDrawGridLayout();
    }
    return () => {};
  }, [scale, pointScale, canvas]);

  return (
    <>
      {/* <div className="absolute z-50 top-32 left-32 flex space-x-2">
        <div
          className="bg-red-300 cursor-pointer p-2 m-1"
          onClick={(e) => {
            if (!canvas) return;

            const rect = new fabric.Rect({
              width: 100,
              height: 100,
              backgroundColor: 'green',
              left: 100,
              top: 100,
            });
            canvas.absolutePan({
              x: 100,
              y: 100,
            });
            canvas.add(rect);
            canvas.requestRenderAll();

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
      </div> */}
    </>
  );
}
