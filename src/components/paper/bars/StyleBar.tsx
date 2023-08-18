import {
  BgTransparentIcon,
  ChatIcon,
  LockIcon,
  ThreeDotsIcon,
  UnLockIcon,
} from '@/components/svgs';
import usePaperStore from '@/store/paper_store';
import { calcCoordSelection, uuid } from '@/utils';
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import useDrawnStore from '@/store/drawn_object_store';
import StrokeWidthRange from '@/components/stylePopup/StrokeWidthRange';
import PathStyleBar from './PathStyleBar';
import ShapeStyleBar from './ShapeStyleBar';
import WallIcon from './WallIcon';
import MoreStypePopup from './MoreStypePopup';
import { CanvasObjectType } from '@/types/types';
import { useState } from 'react';

type Props = {};

/**
 * listByCategory =
 * {
 * path:[item,...],
 * rect:[item,...]
 * }
 */

export default function StyleBar({}: Props) {
  const { showStyleBar, canvas, setShowStyleBar } = usePaperStore();
  const { updateOne, removeOne, addOne } = useDrawnStore();
  const [showMorePopup, setShowMorePopup] = useState(false);

  useEffect(() => {
    return () => {
      setShowMorePopup(false);
    };
  }, [showStyleBar]);

  if (!showStyleBar || !canvas) return null;
  let selectedList = canvas.getActiveObjects() as CanvasObjectType[];

  if (selectedList.length === 0) return null;

  // category
  const listByCategory: { [key: string]: CanvasObjectType[] } = {};
  selectedList.map((item) => {
    let type = item.type || 'Untyped';

    if (!listByCategory[type]) {
      listByCategory[type] = [];
    }
    listByCategory[type].push(item);
  });

  // calc coord
  let coord = calcCoordSelection(selectedList);
  let isLocked = false;
  let isShow = true;

  if (selectedList.length === 1) {
    if (selectedList[0].isLocked) {
      isLocked = true;
    }

    if (selectedList[0].isFrameLabel) {
      isShow = false;
    }
  }

  if (!coord) return null;

  let top = (coord?.tl.y || 0) - 100;
  let left = coord?.tl.x || 0;

  if (top < 64) top = 64;
  if (top > window.innerHeight - 64) top = window.innerHeight - 64;
  if (left > window.innerWidth - 64) left = window.innerWidth - 64;
  if (left < 64) left = 64;

  function handleLock() {
    if (!canvas) return;
    setShowStyleBar(false);

    // handle lock one object
    if (selectedList.length === 1) {
      let obj = selectedList[0] as CanvasObjectType;
      obj.lockMovementX = true;
      obj.lockMovementY = true;
      obj.lockRotation = true;
      obj.hasControls = false;
      obj.set({
        isLocked: true,
      });
      updateOne(obj);
      canvas.requestRenderAll();
    }
    // handle lock many objects
    if (selectedList.length > 1) {
      const newGroup = new fabric.Group() as CanvasObjectType;

      let idActiveList = selectedList.map((item) => item.id);

      canvas.add(newGroup);
      canvas.setActiveObject(newGroup);

      let listObjs = canvas.getObjects() as CanvasObjectType[];

      listObjs?.map((item) => {
        if (idActiveList.includes(item.id)) {
          item.set({
            removedType: 'byGroup',
          });
          canvas.remove(item);

          newGroup.addWithUpdate(item);
        }
      });
      // update
      newGroup.set({
        id: uuid(),
        isLocked: true,
      });
      // update

      addOne(newGroup);

      newGroup.lockMovementX = true;
      newGroup.lockMovementY = true;
      newGroup.hasControls = false;

      canvas.requestRenderAll();
    }
    setShowStyleBar(true);
  }

  function handleUnLock() {
    setShowStyleBar(false);
    if (!canvas) return;
    if (selectedList.length === 1) {
      let obj = selectedList[0];

      if (obj.type === 'group') {
        let group = obj as fabric.Group;
        let list = group.getObjects();

        group.ungroupOnCanvas();
        canvas.remove(group);

        list.map((item) => {
          canvas.add(item);
        });
      } else {
        obj.set({
          lockMovementX: false,
          lockMovementY: false,
          hasControls: true,
          isLocked: false,
        });
        setShowStyleBar(true);
        canvas.requestRenderAll();
      }
    }
    canvas.requestRenderAll();
  }

  function renderBody() {
    let typeObjList = Object.keys(listByCategory);

    if (typeObjList.length === 1) {
      if (typeObjList[0] === 'path')
        return <PathStyleBar listPaths={listByCategory['path']} />;
      if (typeObjList[0] === 'rect')
        return <ShapeStyleBar listByCategory={listByCategory} />;
    }
  }

  if (!isShow) return null;
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
      }}
    >
      <div className="flex bg-white rounded shadow-lg">
        {isLocked ? (
          <div
            className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all"
            onClick={() => {
              if (!canvas) return;
              // handleUnLock();
            }}
          >
            <LockIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </div>
        ) : (
          <>
            {renderBody()}

            <div
              className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all"
              onClick={() => {
                if (!canvas) return;

                // handleLock();
              }}
            >
              <UnLockIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </div>
          </>
        )}
        <WallIcon />
        <div className=" h-10 w-10 flex justify-center items-center cursor-pointer transition-all relative">
          <div
            onClick={(e) => {
              setShowMorePopup(!showMorePopup);
              e.stopPropagation();
            }}
          >
            <ThreeDotsIcon className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </div>
          {showMorePopup && (
            <MoreStypePopup
              className="absolute left-full top-0 translate-x-0.5"
              listByCategory={listByCategory}
              
              close={() => setShowMorePopup(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
