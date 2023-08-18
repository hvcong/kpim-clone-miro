import React from 'react';
import Modal from '../Modal';
import TemplateModalNavLeft from './navLeft/TemplateModalNavLeft';
import TemplateModalRight from './bodyRight/TemplateModalRight';
import { CloseIcon } from '../svgs';
import useTemplateStore from '@/store/template_store';
import { useState } from 'react';
import { useRouter } from 'next/router';

type Props = {};

export default function TemplateModal({}: Props) {
  const templateStore = useTemplateStore();
  const [itemActived, setItemActived] = useState('my-template');

  return (
    <Modal
      show={templateStore.showTemplateModal}
      close={() => {
        templateStore.setShowTemplateModal(false);
      }}
    >
      <div className="w-[90vw] h-[90vh] bg-white rounded grid grid-cols-9 gap-3 relative select-none">
        <div className="col-span-2 border-r">
          <TemplateModalNavLeft
            className="pt-10 pl-10"
            itemActived={itemActived}
            setItemActived={setItemActived}
          />
        </div>
        <div className="col-span-7 overflow-y-hidden">
          <TemplateModalRight
            className="h-full pt-10"
            itemActived={itemActived}
          />
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3">
          <div
            className="bg-black rounded-full h-9 w-9 flex justify-center items-center cursor-pointer"
            onClick={() => {
              templateStore.setShowTemplateModal(false);
            }}
          >
            <CloseIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </Modal>
  );
}
