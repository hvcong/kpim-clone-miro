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
import useActionHistory, { eActionType } from '@/store/action_history';
type Props = {
  paperId: string;
};

export default function Canvas({ paperId }: Props) {
  const { scale, pointScale, setScale, canvas, setShowStyleBar } =
    usePaperStore();
  const toolStore = useToolStore();
  const actionStore = useActionHistory();
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
      canvas.on('object:re_added_many', handleObjReAddedMany);

      canvas.on('object:removed_many', handleObjRemovedMany);

      canvas.on('object:moving', handleObjMoving);

      canvas.on('object:modified', handleModified);
      canvas.on('object:re_modified_many', handleReModifiedMany);

      canvas.on('object:scaling', handleObjScaling);

      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:updated', handleSelectionUpdated);
      canvas.on('selection:cleared', handleSelectionCleared);

      canvas.on('path:created', handleAddedPath);

      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:up', handleMouseUp);

      // event delete by delete key
      document.addEventListener('keydown', deleteObjByKeyBoard);
      drawAll();
    }

    return () => {
      if (canvas && paper) {
        canvas.removeListeners();

        document.removeEventListener('keydown', deleteObjByKeyBoard);
        canvas.clear();
        drawnStore.resetDrawnState();
      }
    };
  }, [paperStore.paper?.id]);

  function drawAll() {
    // just call this affter canvas listent all event
    if (!canvas) return;
    let list = drawnStore.drawnObjList
      .filter((item) => item.ChangeLog.type !== 'DELETE')
      .map((item) => {
        JSON.parse(item.value);

        return JSON.parse(item.value);
      });
    let objs = list.map((item) => {
      return convertDataLessToCanvasObj(item);
    });

    objs.map((obj) => {
      if (!obj) return;
      let item = obj as CanvasObjectType;

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
      socket.on('sv:drawn_obj:re_add_many', drawnStore.on_reAddMany);
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

        canvas.fire('object:removed_many', {
          targetList: objectSelecteds,
          newAction: true,
        });
      }
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  }

  function handleAddedNewObject(e: fabric.IEvent<MouseEvent>) {
    console.log('old-added');
  }
  function handleAddedPath(_: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    let option = _ as unknown as { path: CanvasObjectType };
    let newPath = option.path;

    if (toolStore.getPenType() === 'hightlight') {
      newPath.ct_hightLightPen = true;
    }
    canvas.fire('object:added_many', {
      targetList: [newPath],
      newAction: true,
    });
  }

  function handleObjAddedMany(_: fabric.IEvent<Event>) {
    console.log('canvas-added-many-obj');
    if (!canvas) return;

    const options = _ as unknown as {
      targetList: CanvasObjectType[];
      newAction: boolean;
    };

    const targetList = options.targetList;
    const newAction = options.newAction;

    for (let i = 0; i < targetList.length; i++) {
      let target = targetList[i];

      const id = uuid();

      if (!target.id) {
        target.set({
          id,
        });
      }
      drawnStore.addOne(target);
    }

    if (newAction) {
      actionStore.addAction({
        currentObjDataList: targetList.map((item) =>
          item.toDatalessObject(moreProperties),
        ),
        actionType: eActionType.ADD,
      });
    }
    canvas.requestRenderAll();
  }

  function handleObjReAddedMany(_: fabric.IEvent<Event>) {
    console.log('canvas-re-added-many-obj');
    if (!canvas) return;

    const options = _ as unknown as {
      targetList: CanvasObjectType[];
    };

    const targetList = options.targetList;
    drawnStore.reAddMany(targetList);
    canvas.requestRenderAll();
  }

  function handleModified(options: fabric.IEvent<MouseEvent>) {
    if (!canvas) return;
    console.log('canvas-modified');

    if (canvas?.getActiveObjects().length > 0) {
      setShowStyleBar(true);
    }
    let target = options.target as CanvasObjectType;

    // change many object
    if (target && target._objects) {
      let targetList = target._objects as CanvasObjectType[];
      const { drawnObjList } = useDrawnStore.getState();
      const _prevList = drawnObjList.filter((item) => {
        let isExist = false;
        targetList.map((_item) => {
          if (_item.id === item.id) isExist = true;
        });
        return isExist;
      });
      // re-calc dimension
      let currentObjDataList = [];
      let group = targetList[0].group;
      if (group) {
        currentObjDataList = targetList.map((_item) => {
          return _item.toDatalessObject(moreProperties);
        });

        let groupTop = group.top || 0;
        let groupLeft = group.left || 0;
        let groupHeight = group.height || 0;
        let groupWidth = group.width || 0;
        for (let i = 0; i < currentObjDataList.length; i++) {
          currentObjDataList[i].top =
            groupTop + groupHeight / 2 + currentObjDataList[i].top;
          currentObjDataList[i].left =
            groupLeft + groupWidth / 2 + currentObjDataList[i].left;
        }
      }

      actionStore.addAction({
        beforeObjDataList: _prevList.map((item) => JSON.parse(item.value)),
        actionType: eActionType.UPDATE,
        currentObjDataList: currentObjDataList,
      });

      drawnStore.updateMany(targetList);
    } else {
      const { drawnObjList } = useDrawnStore.getState();
      let prevObj = drawnObjList.filter((item) => item.id === target.id)[0];

      actionStore.addAction({
        beforeObjDataList: [JSON.parse(prevObj.value)],
        actionType: eActionType.UPDATE,
        currentObjDataList: [target.toDatalessObject(moreProperties)],
      });

      drawnStore.updateOne(target);
    }
  }

  function handleReModifiedMany(_: fabric.IEvent<Event>) {
    console.log('re-modified');
    if (!canvas) return;
    const options = _ as unknown as fabric.IEvent<Event> & {
      targetList: CanvasObjectType[];
    };

    const targetList = options.targetList;

    drawnStore.updateMany(targetList);
  }

  function handleObjRemovedMany(_: fabric.IEvent<Event>) {
    console.log('canvas-removed-obj');
    if (!canvas) return;
    let options = _ as unknown as {
      targetList: CanvasObjectType[];
      newAction: boolean;
    };
    const targetList = options.targetList;
    if (options.newAction) {
      actionStore.addAction({
        currentObjDataList: targetList.map((item) =>
          item.toDatalessObject(moreProperties),
        ),
        actionType: eActionType.DELETE,
      });
    }

    drawnStore.removeMany(targetList);
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
    const { showStyleBar } = usePaperStore.getState();
    if (showStyleBar) {
      setShowStyleBar(false);
    }
  }

  useEffect(() => {
    if (canvas) {
      canvas.zoomToPoint(pointScale, scale);

      // handleDrawGridLayout();
    }
    return () => {};
  }, [scale, pointScale, canvas]);

  useEffect(() => {
    function handleResizeScreen(e: UIEvent) {
      if (canvas) {
        canvas.setHeight(window.innerHeight);
        canvas.setWidth(window.innerWidth);
      }
    }
    window.addEventListener('resize', handleResizeScreen, true);

    return () => {
      window.removeEventListener('resize', handleResizeScreen);
    };
  }, [canvas]);

  // show cursor of other users
  useEffect(() => {
    if (paperStore.showCursorPartner && canvas && socket) {
      socket.on('sv:member:mouse_moving', (data) => {
        console.log(data);
      });
    }

    return () => {
      if (paperStore.showCursorPartner && canvas && socket) {
        socket.off('sv:member:mouse_moving');
      }
    };
  }, [paperStore.showCursorPartner, canvas, socket]);

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
