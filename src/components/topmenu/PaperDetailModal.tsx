/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Modal from '../Modal';
import Image from 'next/image';
import usePaperStore from '@/store/paper_store';
import { useState } from 'react';
import { useEffect } from 'react';
import useSocketIoStore from '@/store/socketio_store';

type Props = {
  show: boolean;
  close: () => void;
};

export default function PaperDetailModal() {
  const { showPaperDetailModal: show, setShowPaperDetailModal } =
    usePaperStore();
  const { paper } = usePaperStore();

  const [newName, setNewName] = useState(paper?.name || '');
  const { emit_updatePaperName } = usePaperStore();

  useEffect(() => {
    if (paper) {
      setNewName(paper.name);
    }

    return () => {};
  }, [paper?.name]);

  useEffect(() => {
    if (paper?.name !== newName) {
      emit_updatePaperName(newName || 'Untitled');
    }
    return () => {};
  }, [show]);

  function close() {
    setShowPaperDetailModal(false);
  }

  if (!paper) return null;
  return (
    <Modal close={close} show={show}>
      <div className="bg-white rounded-xl w-full max-w-lg p-10 text-sm">
        <div className="flex space-x-6">
          <div className="">
            <div className="border border-gray-300 rounded-sm mb-2">
              <img
                src="/board_icon.png"
                alt="paper thumb"
                className="w-36 h-36 rounded-sm"
              />
            </div>
            <div className="text-gray-500 underline decoration-gray-300 underline-offset-4">
              Change thumbnail
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="pb-2">
              <input
                className="w-full outline-none pb-1 font-semibold text-xl"
                value={newName}
                onChange={({ target }) => {
                  setNewName(target.value);
                }}
              />
              <div className="w-full border-b border-gray-300"></div>
            </div>
            <div className="pb-2">
              <input
                className="w-full outline-none pb-1"
                placeholder="Description"
              />
              <div className="w-full border-b border-gray-300"></div>
            </div>
            <div className="flex">
              <div className="w-24 text-gray-500 ">Owner</div>
              <div className="">hvcong</div>
            </div>
            <div className="flex">
              <div className="w-24 text-gray-500 ">Created</div>
              <div className="">Today</div>
            </div>
            <div className="flex">
              <div className="w-24 text-gray-500 ">Last modified</div>
              <div className="">Today</div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-1 border border-gray-300 rounded-sm">
            Delete
          </button>

          <button className="px-4 py-1 border border-gray-300 rounded-sm">
            Share
          </button>
        </div>
      </div>
    </Modal>
  );
}
