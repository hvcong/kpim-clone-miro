import usePaperStore from '@/store/paper_store';
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import useToolStore from '@/store/tool_store';
import ShapePopup from './ShapePopup';
import PenPopup from './PenPopup';
import { uuid } from '@/utils';
import useDrawnStore, { CanvasObjectType } from '@/store/drawn_object_store';
import { ChatIcon, FrameIcon } from '../svgs';
import { Frame } from '@/utils/customFabricClass';

type Props = {};

type PopupKeyType = 'shape' | 'pen' | 'comment' | '';

export default function ToolList({}: Props) {
  const { canvas } = usePaperStore();
  const { tool, setTool, shapeType, penStyle, penType } = useToolStore();
  const { updateOne } = useDrawnStore();
  const { scale } = usePaperStore();

  const [showPopupKey, setShowPopupKey] = useState<PopupKeyType>('');

  useEffect(() => {
    let clearFunc: (() => void) | null | undefined = null;
    if (canvas) {
      if (tool === 'pen') {
        clearFunc = handleFreeDraw();
      }

      if (tool === 'text') {
        clearFunc = handleAddText();
      }

      if (tool === 'shape') {
        clearFunc = handleShapeDraw();
      }

      if (tool === 'default') {
        canvas.getObjects().map((obj) => {
          obj.selectable = true;
          obj.hoverCursor = 'move';
        });
        canvas.selection = true;
        canvas.defaultCursor = 'default';
        canvas.isDrawingMode = false;
        canvas.requestRenderAll();
      }
    }

    return () => {
      if (canvas) {
        if (tool == 'pen') {
          canvas.isDrawingMode = false;
        }
      }
      if (clearFunc) {
        clearFunc();
      }
    };
  }, [tool, shapeType, canvas]);

  function handleShapeDraw() {
    if (!canvas) return;

    canvas.getObjects().map((obj) => {
      obj.selectable = false;
      obj.hoverCursor = 'crosshair';
    });

    canvas.selection = false;
    canvas.discardActiveObject();
    canvas.defaultCursor = 'crosshair';
    canvas.requestRenderAll();

    let isDrawing = false;

    canvas.on('mouse:move', mouseMove);

    // Thêm sự kiện mouse:down để bắt đầu vẽ hình
    canvas.on('mouse:down', mouseDown);

    // Thêm sự kiện mouse:up để kết thúc vẽ hình
    canvas.on('mouse:up', mouseUp);

    function mouseMove(options: fabric.IEvent<MouseEvent>) {
      if (!isDrawing || !canvas) return;
      const pointer = options.pointer;

      /**rectangle */
      if (shapeType === 'rectangle') {
        const rect = canvas.getActiveObject();
        let width = (pointer?.x || 0) - (rect?.left || 0);
        let height = (pointer?.y || 0) - (rect?.top || 0);

        rect?.set({
          width: width,
          height: height,
        });
      }

      /**eclipse */
      if (shapeType == 'eclipse') {
        const eclipse = canvas.getActiveObject() as fabric.Ellipse;
        let width = (pointer?.x || 0) - (eclipse.left || 0);

        let height = (pointer?.y || 0) - (eclipse.top || 0);

        let rx = width / 2;
        let ry = height / 2;

        if (options.e.shiftKey) {
          rx = ry = Math.max(rx, ry);
        }

        if (rx < 0 || ry < 0) {
          return;
        }

        eclipse.set({
          rx,
          ry,
          angle: 0,
        });
      }

      canvas.requestRenderAll();
    }

    function mouseDown(options: fabric.IEvent<MouseEvent>) {
      if (!canvas) return;
      const pointer = canvas.getPointer(options.e);
      const x = pointer.x;
      const y = pointer.y;
      let shape: CanvasObjectType | fabric.Object | null = null;

      if (shapeType === 'rectangle') {
        shape = new fabric.Rect({
          left: x,
          top: y,
          width: 0,
          height: 0,
          fill: 'transparent',
          stroke: 'black',
          strokeWidth: 1,
          selectable: false,
          hasControls: false,
          hasBorders: false,
        });
      }

      if (shapeType === 'eclipse') {
        shape = new fabric.Ellipse({
          left: x,
          top: y,
          rx: 0,
          ry: 0,
          fill: 'transparent',
          stroke: 'black',
          strokeWidth: 1,
          selectable: false,
          hasControls: false,
          hasBorders: false,
        });
      }
      if (shape) {
        shape.set({
          id: uuid(),
        });

        canvas.add(shape);
        canvas.setActiveObject(shape);

        isDrawing = true;
      }
    }

    function mouseUp(options: fabric.IEvent<MouseEvent>) {
      if (!canvas) return;
      isDrawing = false;
      const shape = canvas.getActiveObject() as CanvasObjectType;
      if (shape) {
        shape.set({
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });

        updateOne(shape);
        canvas.selection = true;
        canvas.requestRenderAll();
        setTool('default');
      }
    }

    return () => {
      canvas.off('mouse:move', mouseMove);
      canvas.off('mouse:down', mouseDown);
      canvas.off('mouse:up', mouseUp);
    };
  }

  function handleAddText() {
    if (!canvas) return;

    canvas.getObjects().map((obj) => {
      obj.selectable = false;
      obj.hoverCursor = 'text';
    });

    canvas.selection = false;
    canvas.discardActiveObject();
    canvas.defaultCursor = 'text';
    canvas.requestRenderAll();

    canvas.on('mouse:down', mouseDown);

    function mouseDown(e: fabric.IEvent<MouseEvent>) {
      if (!canvas) return;
      const pointer = e.pointer;

      const textBox = new fabric.Textbox('', {
        left: pointer?.x || 0,
        top: pointer?.y || 0,
        fontSize: 20,
      });
      canvas.add(textBox);
      canvas.setActiveObject(textBox);
      textBox.enterEditing();
      textBox.hiddenTextarea?.focus();
      canvas.requestRenderAll();
      setTool('default');
    }

    // clear function
    return () => {
      canvas.off('mouse:down', mouseDown);
    };
  }

  function handleFreeDraw() {
    if (!canvas) return;
    canvas.isDrawingMode = true;

    return () => {
      canvas.isDrawingMode = false;
    };
  }

  return (
    <div className="bg-white flex flex-col rounded-md shadow-lg">
      <div
        onClick={() => {
          setTool('default');
          setShowPopupKey('');
        }}
        className={`ct-menu-item ${tool === 'default' && 'active'}`}
      >
        <svg
          className="ct-menu-icon"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
          />
        </svg>
      </div>
      {/* template */}
      <div
        className={`ct-menu-item`}
        onClick={() => {
          let stickyNote = new fabric.Textbox('', {
            height: 100,
            backgroundColor: 'red',
            top: 200,
            left: 200,
          });
          canvas?.add(stickyNote);
          canvas?.requestRenderAll();
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="ct-menu-icon"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          data-testid="svg-icon"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            d="M4 4V8H20V4H4ZM4 20V10H8V20H4ZM10 20H20V10H10V20ZM3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      {/* pen */}
      <div
        onClick={(e) => {
          setTool('pen');
          setShowPopupKey('pen');
          e.stopPropagation();
        }}
        className={`relative ct-menu-item ${tool === 'pen' && 'active '}`}
      >
        <svg
          className="ct-menu-icon "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 21 21"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
          />
        </svg>
        <PenPopup
          show={showPopupKey === 'pen'}
          close={() => {
            setShowPopupKey('');
          }}
        />
      </div>

      {/* text */}
      <div
        onClick={() => {
          setTool('text');
          setShowPopupKey('');
        }}
        className={`ct-menu-item ${tool === 'text' && 'active'}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="ct-menu-icon"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          data-testid="svg-icon"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7C21 7.55228 20.5523 8 20 8C19.4477 8 19 7.55228 19 7V5H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V5H5V7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7V5Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {/* shape */}
      <div
        onClick={(e) => {
          setTool('shape');
          setShowPopupKey('shape');
          e.stopPropagation();
        }}
        className={`relative ct-menu-item ${tool === 'shape' && 'active'}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="ct-menu-icon"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          data-testid="svg-icon"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            d="M15.5 14C18.5376 14 21 11.5376 21 8.5C21 5.46243 18.5376 3 15.5 3C12.4624 3 10 5.46243 10 8.5C10 8.66854 10.0076 8.83532 10.0224 9H14C14.5523 9 15 9.44771 15 10V13.9776C15.1647 13.9924 15.3315 14 15.5 14ZM15 15.9836V21C15 21.5523 14.5523 22 14 22H3C2.44772 22 2 21.5523 2 21V10C2 9.44771 2.44772 9 3 9H8.0164C8.00552 8.83474 8 8.66801 8 8.5C8 4.35786 11.3579 1 15.5 1C19.6421 1 23 4.35786 23 8.5C23 12.6421 19.6421 16 15.5 16C15.332 16 15.1653 15.9945 15 15.9836ZM4 20V11H13V20H4Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>

        <ShapePopup
          show={showPopupKey === 'shape'}
          close={() => {
            setShowPopupKey('');
          }}
        />
      </div>

      {/* comment */}
      <div
        onClick={(e) => {
          setTool('comment');
          setShowPopupKey('comment');
          e.stopPropagation();
        }}
        className={`relative ct-menu-item ${tool === 'comment' && 'active'}`}
      >
        <ChatIcon className="ct-menu-icon" />
      </div>

      {/* frame */}
      <div
        onClick={(e) => {
          let rectOpt: fabric.IRectOptions & { frameLabel: string } = {
            top: 100,
            left: 100,
            height: 200,
            width: 200,
            frameLabel: 'frame label',
          };
          let frame = new Frame(rectOpt);

          canvas?.add(frame);
          canvas?.requestRenderAll();

          e.stopPropagation();
        }}
        className={`relative ct-menu-item`}
      >
        <FrameIcon className="ct-menu-icon" />
      </div>
    </div>
  );
}
