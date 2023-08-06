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
import useDrawnStore, { DrawObjectType } from '@/store/drawn_object_store';

type Props = {};

export default function StyleBar({}: Props) {
  const { showStyleBar, canvas, setShowStyleBar } = usePaperStore();
  const { updateOne, removeOne, addOne } = useDrawnStore();

  if (!showStyleBar || !canvas) return null;
  let selectedList = canvas.getActiveObjects() as DrawObjectType[];
  if (selectedList.length === 0) return null;

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
      let obj = selectedList[0] as DrawObjectType;
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
      const newGroup = new fabric.Group() as DrawObjectType;

      let idActiveList = selectedList.map((item) => item.id);

      canvas.add(newGroup);
      canvas.setActiveObject(newGroup);

      let listObjs = canvas.getObjects() as DrawObjectType[];

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
              handleUnLock();
            }}
          >
            <LockIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </div>
        ) : (
          <>
            <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all ">
              <div className="w-5 h-5 rounded-full border-2 border-gray-600 group-hover:border-gray-800"></div>
            </div>
            <WallIcon />
            <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all">
              <div className="w-5 h-5 rounded-full border-4 border-gray-600"></div>
            </div>
            <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all">
              <BgTransparentIcon className="w-5 h-5" />
            </div>
            <WallIcon />
            <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all">
              <ChatIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </div>
            <div
              className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all"
              onClick={() => {
                if (!canvas) return;

                handleLock();
              }}
            >
              <UnLockIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </div>
          </>
        )}
        <WallIcon />
        <div className="group h-10 w-10 flex justify-center items-center cursor-pointer transition-all">
          <ThreeDotsIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
        </div>
      </div>
    </div>
  );
}

function WallIcon() {
  return <div className="border border-gray-200"></div>;
}
