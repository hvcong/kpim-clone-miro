'use client';
import React, { useEffect, useRef, useMemo } from 'react';

import ScaleMenu from '@/components/paperSideBar/ScaleMenu';
import Canvas from '@/components/paper/Canvas';
import usePaperStore from '@/store/paper_store';
import { fabric } from 'fabric';
import { io } from 'socket.io-client';

import TopMenu from '@/components/topmenu/TopMenu';
import RightSideBar from '@/components/paperSideBar/RightSideBar';
import PaperDetailModal from '@/components/topmenu/PaperDetailModal';
import LeftSideBar from '@/components/paperSideBar/LeftSideBar';
import StyleBar from '@/components/paper/bars/StyleBar';
import useDrawnStore from '@/store/drawn_object_store';
import RequireAuth from '@/components/requireAuth';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import paperApi from '@/api/paperApi';
import useGlobalStore from '@/store';
import { BASE_URL } from '@/api/axiosClient';
import { browserStore } from '@/utils';
import useSocketIoStore from '@/store/socketio_store';
import MemberCursorList from '@/components/paper/MemberCursorList';
import useToolStore from '@/store/tool_store';
import TemplateModal from '@/components/templateModal/TemplateModal';
import TemplateSaveModal from '@/components/template/TemplateSaveModal';
import useTemplateStore from '@/store/template_store';

type Props = {};

async function getPaperById(paperId: string) {
  return paperApi.getOneById(paperId);
}

function Paper({}: Props) {
  const { canvas, setCanvas, setPaper, resetPaperState, paper } =
    usePaperStore();
  const { setFullLoading } = useGlobalStore();
  const { setSocket } = useSocketIoStore();
  const { resetDrawnState } = useDrawnStore();
  const { resetToolStore } = useToolStore();
  const { setSaveModalState } = useTemplateStore();

  const router = useRouter();
  const paperId = router.query.paperId as string;

  useEffect(() => {
    // init canvas
    if (!canvas) {
      const newCanvas = new fabric.Canvas('canvas', {
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: '#f2f2f2',
        enableRetinaScaling: true,
        fireRightClick: true, // <-- enable firing of right click events
        fireMiddleClick: true, // <-- enable firing of middle click events
        stopContextMenu: true,
      });

      setCanvas(newCanvas);
      setFullLoading(true);
    }
    function onScalePaper(e: WheelEvent) {
      // prevent scale screen of browser
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }
    document.addEventListener('wheel', onScalePaper, {
      passive: false,
    });
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    return () => {
      document.removeEventListener('wheel', onScalePaper);
      setCanvas(null);
      resetDrawnState();
      resetPaperState();
      resetToolStore();
      setSaveModalState({
        show: false,
        list: [],
      });
    };
  }, []);

  // connect io
  useEffect(() => {
    if (paperId) {
      console.log('init soket');
      const socket = io(BASE_URL, {
        auth: (cb) => {
          cb({
            token: 'Bear ' + browserStore.getToken(),
            paperId,
          });
        },
      });
      setSocket(socket);
      return () => {
        if (socket) {
          setSocket(null);
          socket.disconnect();
        }
      };
    }
  }, [paperId]);

  return (
    <div className="relative w-screen h-screen bg-white cursor-default select-none overflow-hidden">
      <canvas id="canvas" className="relative"></canvas>
      {canvas && <Canvas paperId={paperId} />}

      <PaperDetailModal />
      <TopMenu />
      <RightSideBar />
      <LeftSideBar />
      <StyleBar />
      <MemberCursorList />
      <TemplateSaveModal />
    </div>
  );
}

export default RequireAuth(Paper);
