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
import useDrawnStore, { DrawnObjectType } from '@/store/drawn_object_store';
import RequireAuth from '@/components/requireAuth';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import paperApi from '@/api/paperApi';
import useGlobalStore from '@/store';
import { BASE_URL } from '@/api/axiosClient';
import { canvasHandler } from '@/handler/canvasHandler';
import { browserStore } from '@/utils';

type Props = {};

async function getPaperById(paperId: string) {
  return paperApi.getOneById(paperId);
}

function Paper({}: Props) {
  const { canvas, setCanvas, setPaper, resetPaperState, paper } =
    usePaperStore();
  const { resetDrawnState, setDrawnObjectList } = useDrawnStore();
  const { setFullLoading, setSocket } = useGlobalStore();

  const router = useRouter();
  const paperId = router.query.paperId as string;

  // const { data, isError, isFetching } = useQuery(
  //   ['get_paper', paperId],
  //   () => paperApi.getOneById(paperId),
  //   {
  //     onSuccess: (data) => {
  //       console.log('render');
  //       if (canvas) {
  //         let paper = data.data.paper;

  //         setPaper({
  //           ...paper,
  //           value: JSON.parse(paper.value),
  //         });
  //       }
  //     },
  //   },
  // );

  useEffect(() => {
    // init canvas
    if (!canvas) {
      const newCanvas = new fabric.Canvas('canvas', {
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: '#f2f2f2',
        // isDrawingMode: true,
        enableRetinaScaling: true,
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

    return () => {
      document.removeEventListener('wheel', onScalePaper);
      setCanvas(null);
      resetDrawnState();
      resetPaperState();
    };
  }, []);

  // connect io
  useEffect(() => {
    console.log('soket');
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
    </div>
  );
}

export default RequireAuth(Paper);
