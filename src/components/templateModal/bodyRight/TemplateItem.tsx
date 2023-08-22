/* eslint-disable @next/next/no-img-element */
import templateApi from '@/api/templateApi';
import usePaperStore from '@/store/paper_store';
import { CanvasObjectType, TemplateType } from '@/types/types';
import {
  convertDataLessToCanvasObj,
  generateColorFromUUID,
  uuid,
} from '@/utils';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import { fabric } from 'fabric';
import useGlobalStore, { eToastType } from '@/store';
import paperApi from '@/api/paperApi';
import useTemplateStore from '@/store/template_store';

type Props = {
  data: TemplateType;
};

function getTmpDetail(templateId: string) {
  return templateApi.getById(templateId);
}
export default function TemplateItem({ data }: Props) {
  const { canvas } = usePaperStore();
  const { setShowTemplateModal } = useTemplateStore();
  const { setBotoomToast } = useGlobalStore();
  const router = useRouter();
  let currentPage = router.route.split('/')[1];

  const { mutate: addTmpToPaperMutate } = useMutation(
    () => {
      setBotoomToast('Using template...');
      return getTmpDetail(data.id);
    },
    {
      onSuccess(data) {
        if (!canvas) {
          console.log('canvas null');
          return;
        }

        let drawnObjs = data?.data?.template?.DrawnObjects || [];
        let canvasObjs = drawnObjs.map((item) => {
          return convertDataLessToCanvasObj(JSON.parse(item.value));
        });

        const listObjs: CanvasObjectType[] = [];
        canvasObjs.map((item) => {
          if (item) {
            let _item = item as CanvasObjectType;
            let id = uuid();
            _item.id = id;
            canvas.add(_item);
            console.log(_item);
            listObjs.push(_item);
            canvas.requestRenderAll();
          }
        });

        //set actived object
        canvas.discardActiveObject(); // Clear any previously active objects
        let activedObj = new fabric.ActiveSelection(listObjs, {
          canvas: canvas,
        });
        canvas.setActiveObject(activedObj);
        setBotoomToast('Success!', 2000, eToastType.success);
        setShowTemplateModal(false);
      },
      onError(error) {
        setBotoomToast('Error!', 2000, eToastType.error);
        console.log(error);
      },
    },
  );

  const newPaperMution = useMutation(
    ({ templateId }: { templateId?: string }) => {
      return paperApi.create(templateId);
    },
    {
      onSuccess: ({ data }) => {
        let id = data.newPaper.id;
        if (id) {
          setShowTemplateModal(false);
          router.push('/paper/' + id);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    },
  );

  return (
    <div>
      <div className=" rounded-xl flex justify-center relative overflow-hidden cursor-pointer group">
        <div className="">
          <img src="/thumb2.png" alt="paper thumb" className="w-full h-full" />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500/20 opacity-0 flex flex-col group-hover:visible group-hover:opacity-100 transition-all duration-300">
          <div className="flex-1 p-3 text-sm">{data.description}</div>
          <div className="flex justify-center items-center space-x-3 py-2">
            {currentPage === 'paper' ? (
              <div
                className="rounded-2xl bg-blue-600 transition-all text-white px-4 h-8 flex items-center text-sm hover:bg-blue-700 cursor-pointer"
                onClick={() => {
                  addTmpToPaperMutate();
                }}
              >
                Use template
              </div>
            ) : (
              <div
                className="rounded-2xl bg-blue-600 transition-all text-white px-4 h-8 flex items-center text-sm hover:bg-blue-700 cursor-pointer"
                onClick={() => {
                  newPaperMution.mutate({ templateId: data.id });
                }}
              >
                Use
              </div>
            )}
            <div className="rounded-2xl border border-blue-600 bg-white text-blue-600  transition-all px-4 h-8 flex items-center text-sm hover:text-blue-700 hover:border-blue-700 cursor-pointer">
              Preview
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="flex">
          <div
            className="rounded-full  h-4 w-4 text-xs flex justify-center items-center"
            style={{
              backgroundColor: generateColorFromUUID(data.User.id)
                .backgroundColor,
              color: generateColorFromUUID(data.User.id).textColor,
            }}
          >
            {data.User.username?.charAt(0)?.toUpperCase() ||
              data.User.email?.charAt(0)?.toUpperCase()}
          </div>
          <div className="text-xs pl-1 text-gray-800">{data.User.username}</div>
        </div>
        <div className="text-base font-semibold pt-1 pb-4">{data.name}</div>
      </div>
    </div>
  );
}
