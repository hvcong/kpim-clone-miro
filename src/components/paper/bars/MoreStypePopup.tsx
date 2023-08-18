import templateApi from '@/api/templateApi';
import useGlobalStore, { eToastType } from '@/store';
import useTemplateStore from '@/store/template_store';
import { CanvasObjectType } from '@/types/types';
import React, { useEffect, useRef } from 'react';
import { useMutation } from 'react-query';

type Props = {
  className: string;
  listByCategory: {
    [key: string]: CanvasObjectType[];
  };
  close: () => void;
};

export default function MoreStypePopup({
  className,
  listByCategory,
  close,
}: Props) {
  const tmpStore = useTemplateStore();
  const { setBotoomToast } = useGlobalStore();

  const { mutate: addTemplateMutate } = useMutation(
    ({ list, name }: { list: CanvasObjectType[]; name: string }) => {
      setBotoomToast('Saving...');
      return templateApi.add(list, name);
    },
    {
      onSuccess(data) {
        setBotoomToast('Saved', 2000, eToastType.success);
        console.log(data);
      },
      onError(error) {
        setBotoomToast('Save error', 2000, eToastType.error);
        console.log(error);
      },
    },
  );

  async function saveAsTemplate() {
    let list: CanvasObjectType[] = [];
    Object.keys(listByCategory).map((key) => {
      list.push(...listByCategory[key]);
    });
    addTemplateMutate({
      list,
      name: 'template_name',
    });
  }

  // hide when click outside
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function clickOut({ target }: MouseEvent) {
      if (!containerRef?.current?.contains(target as HTMLElement)) {
        close();
      }
    }
    window.addEventListener('click', clickOut);
    return () => {
      window.removeEventListener('click', clickOut);
    };
  }, []);

  return (
    <div className={className} ref={containerRef}>
      <div className="bg-white w-56 text-sm p-3 rounded shadow-lg space-y-3">
        <div className="flex justify-between  group">
          <div className="group-hover:text-blue-500">Infor</div>
          <div className="text-gray-400 ">Ctrl + shift + L</div>
        </div>
        <div className="flex justify-between group">
          <div className="group-hover:text-blue-500">Lock</div>
          <div className="text-gray-400 ">Ctrl + shift + L</div>
        </div>
        <div className="flex justify-between group">
          <div className="group-hover:text-blue-500">Bring to front</div>
          <div className="text-gray-400 "></div>
        </div>
        <div className="flex justify-between group">
          <div className="group-hover:text-blue-500">Send to back</div>
          <div className="text-gray-400 "></div>
        </div>
        <div className="flex justify-between group">
          <div className="group-hover:text-blue-500">Copy</div>
          <div className="text-gray-400 ">Ctrl + C</div>
        </div>
        <div className="flex justify-between group">
          <div className="group-hover:text-blue-500">Duplicate</div>
          <div className="text-gray-400 ">Ctrl + D</div>
        </div>
        <div
          className="flex justify-between group"
          onClick={() => {
            saveAsTemplate();
          }}
        >
          <div className="group-hover:text-blue-500">Save as template</div>
          <div className="text-gray-400 "></div>
        </div>
        <div className="flex justify-between group">
          <div className="group-hover:text-blue-500">Delete</div>
          <div className="text-gray-400 ">Delete</div>
        </div>
      </div>
    </div>
  );
}
