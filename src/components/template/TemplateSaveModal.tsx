import React, { useRef, useState } from 'react';
import Modal from '../Modal';
import useTemplateStore from '@/store/template_store';
import { useMutation } from 'react-query';
import { CanvasObjectType } from '@/types/types';
import useGlobalStore, { eToastType } from '@/store';
import templateApi from '@/api/templateApi';

type Props = {};

export default function TemplateSaveModal({}: Props) {
  const tmpStore = useTemplateStore();
  const { setBotoomToast } = useGlobalStore();

  const { mutate: addTemplateMutate } = useMutation(
    ({
      list,
      name,
      description,
    }: {
      list: CanvasObjectType[];
      name: string;
      description?: string;
    }) => {
      setBotoomToast('Saving...');
      return templateApi.add(list, name, description);
    },
    {
      onSuccess(data) {
        setBotoomToast('Saved', 2000, eToastType.success);
        tmpStore.setSaveModalState({
          show: false,
          list: [],
        });
      },
      onError(error) {
        setBotoomToast('Save error', 2000, eToastType.error);
        console.log(error);
      },
    },
  );
  const [templateName, setTemplateName] = useState('');
  const [templateDesc, setTemplateDesc] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLInputElement>(null);

  async function handleSave() {
    if (!templateName || !(templateName && templateName.trim())) {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } else {
      addTemplateMutate({
        list: tmpStore.saveModalState.list,
        name: templateName,
        description: templateDesc,
      });
    }
  }

  return (
    <Modal
      show={tmpStore.saveModalState.show}
      close={() => {
        tmpStore.setSaveModalState({
          show: false,
          list: [],
        });
      }}
    >
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
                value={templateName}
                onChange={({ target }) => {
                  setTemplateName(target.value);
                }}
                placeholder="Template name"
                ref={nameInputRef}
              />
              <div className="w-full border-b border-gray-300"></div>
            </div>
            <div className="pb-2">
              <input
                className="w-full outline-none pb-1"
                placeholder="Description"
                value={templateDesc}
                onChange={({ target }) => {
                  setTemplateDesc(target.value);
                }}
                ref={descInputRef}
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
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-1 border border-gray-300 rounded-sm"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
