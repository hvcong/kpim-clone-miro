import { DrawnStoreType } from '@/store/drawn_object_store';
import { Socket } from 'socket.io-client';

type Props = {
  canvas: fabric.Canvas;
  socket: Socket;
  drawnStore: DrawnStoreType;
};

export default function socketHandler({ canvas, socket, drawnStore }: Props) {
  socket.on('connect', () => {
    console.log('connect');
    console.log(drawnStore.addOne('aaa'));
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

  return () => {
    //clear function
    socket.removeAllListeners();
  };
}
