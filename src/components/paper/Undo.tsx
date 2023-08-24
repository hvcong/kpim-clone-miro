import React from 'react';
import { ReUndoIcon, UndoIcon } from '../svgs';
import useActionHistory from '@/store/action_history';

type Props = {};

export default function Undo({}: Props) {
  const actionStore = useActionHistory();

  let canUndo: boolean = actionStore.currentIndex > -1;
  let canReUndo: boolean =
    actionStore.currentIndex < actionStore.actionList.length - 1;
  console.log(actionStore.actionList, actionStore.currentIndex);

  return (
    <div className="flex flex-col bg-white rounded-md mt-2 shadow-lg">
      <div
        className={canUndo ? 'ct-menu-item' : 'ct-menu-item-disable'}
        onClick={() => {
          if (canUndo) {
            actionStore.toUndoAction();
          }
        }}
      >
        <UndoIcon className="ct-menu-icon" />
      </div>
      <div
        className={canReUndo ? 'ct-menu-item' : 'ct-menu-item-disable'}
        onClick={() => {
          if (canReUndo) {
            actionStore.toReUndoAction();
          }
        }}
      >
        <ReUndoIcon className="ct-menu-icon" />
      </div>
    </div>
  );
}
